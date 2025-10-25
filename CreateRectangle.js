class CreateRectangle {

    existingRects = [];
    creationRect;

    startX;
    startY;

    selectedColor;

    creatingRect = false;

    constructor(color){
        this.selectedColor = color;
    }

    changeColor(color){
        this.selectedColor = color;
    }

    startCreatingRect(x, y){
        this.startX = x;
        this.startY = y;
        this.creationRect = new Rectangle(x, y, 1, 1, this.selectedColor);
        this.creatingRect = true;
    }

    continueCreatingRect(x, y){
        if(this.creatingRect){
            if(x > this.startX){
                this.creationRect.x = this.startX;
                this.creationRect.width = x - this.startX;
            } else {
                this.creationRect.x = x;
                this.creationRect.width = this.startX - x;
            }
            if(y > this.startY){
                this.creationRect.y = this.startY;
                this.creationRect.height = y - this.startY;
            } else {
                this.creationRect.y = y;
                this.creationRect.height = this.startY - y;
            }
        }
    }

    stopCreatingRect(x, y){
        this.continueCreatingRect(x, y);
        this.existingRects.push(this.creationRect);
        this.creatingRect = false;
    }

    draw(){
        this.existingRects.forEach(rect => {
            rect.draw();
        });
        if(this.creatingRect){
            this.creationRect.draw();
        }
    }
}