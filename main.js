const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var backgroundColor = "black";
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var temp = new Rectangle(20, 20, 50, 50, "red");
var createRects = new CreateRectangle("blue");

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
    //drawRectangle(temp);
    createRects.draw();
}

function MouseDown(event){
    createRects.startCreatingRect(event.clientX, event.clientY);
}

function MouseMove(){
    createRects.continueCreatingRect(event.clientX, event.clientY);
}

function MouseUp(){
    createRects.stopCreatingRect(event.clientX, event.clientY);
}

setInterval(Update, 16);
window.addEventListener('mousedown', MouseDown);
window.addEventListener('mousemove', MouseMove);
window.addEventListener('mouseup', MouseUp);