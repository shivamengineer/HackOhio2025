class MoveRectangle {
    rectangleToMove;
    movingRect = false;

    offsetX = 0;
    offsetY = 0;

    constructor(){

    }

    changeTime(time){
        this.currentTime = time;
    }

    startMovingRect(x, y, rect){
        this.movingRect = true;
        this.rectangleToMove = rect;
        this.offsetX = x - this.rectangleToMove.x;
        this.offsetX = y - this.rectangleToMove.y;
    }

    continueMovingRect(x, y){
        if(this.movingRect){
            this.rectangleToMove.x = x - this.offsetX;
            this.rectangleToMove.y = y - this.offsetX;
        }
    }

    stopMovingRect(x, y){
        if(this.movingRect){
            this.continueMovingRect(x, y);
            this.movingRect = false;
            return this.rectangleToMove;
        }
    }

    draw(){
        if(this.movingRect){
            this.rectangleToMove.draw();
        }
    }
}
