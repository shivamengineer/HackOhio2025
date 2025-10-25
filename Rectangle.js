class Rectangle {

    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    pointCollides(x, y){
        return (x > this.x &&
            x < this.x + this.width &&
            y > this.x &&
            y < this.y + this.height);
    }

    rectCollides(rect){
        return (rect.x + rect.width > this.x &&
            rect.x < this.x + this.width &&
            rect.y + rect.height > this.y &&
            rect.y < this.y + this.height);
    }

}