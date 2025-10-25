const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var backgroundColor = "black";
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var temp = new Rectangle(20, 20, 50, 50, "red");

function drawRectangle(rect){
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function clearscreen(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function Update(){
    clearscreen();
    Draw();
}

function Draw(){
    drawRectangle(temp);
}

setInterval(Update, 16);