const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var backgroundColor = "black";
var rectStartColor = "blue";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const modes = {
  ADD: 'ADD',
  MOVE: 'MOVE',
  SCALE: 'SCALE'
}

var currentMode = modes.ADD;

var id = 0;

var createRects = new CreateRectangle(rectStartColor);
var moveRects = new MoveRectangle();
var keyframeDictionaries = [];

var currentTime = 0;

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
    createRects.draw();
    for(i = 0; i < keyframeDictionaries.length; i++){
        keyframeDictionaries[i].draw(currentTime);
    }
}

function selectRect(x, y){
    var found = false;
    var i;
    for(i = 0; !found && i < keyframeDictionaries.length; i++){
        var rectAtTime = keyframeDictionaries[i].getRectAtTime(currentTime);
        if(rectAtTime.pointCollides(x, y)){
            found = true;
            moveRects.startMovingRect(x, y, rectAtTime);
            console.log("collides");
        }
    }

}

function MouseDown(event){
    if(currentMode == modes.ADD) createRects.startCreatingRect(event.clientX, event.clientY);
    if(currentMode == modes.MOVE) selectRect(event.clientX, event.clientY);
}

function MouseMove(event){
    if(currentMode == modes.ADD) createRects.continueCreatingRect(event.clientX, event.clientY);
    if(currentMode == modes.MOVE) moveRects.continueMovingRect(event.clientX, event.clientY);
}

function MouseUp(event){
    if(currentMode == modes.ADD){
        var rect = createRects.stopCreatingRect(event.clientX, event.clientY);
        var dictionary = new RectangleKeyframeDictionary(id);
        id++;
        dictionary.addKeyframe(rect, currentTime);
        keyframeDictionaries.push(dictionary);
    }
    if(currentMode == modes.MOVE) moveRects.stopMovingRect(event.clientX, event.clientY);
}

function OnKeyDown(event){
    switch(event.keyCode){
        case 65:
            currentTime--;
            console.log("time = " + currentTime);
            break;
        case 68:
            currentTime++;
            console.log("time = " + currentTime);
            break;
        case 69:
            currentMode = modes.MOVE;
            console.log("move mode");
            break;
        case 67:
            currentMode = modes.ADD;
            console.log("add mode");
            break;
    }
    createRects.changeTime(currentTime);
}

setInterval(Update, 16);
window.addEventListener('mousedown', MouseDown);
window.addEventListener('mousemove', MouseMove);
window.addEventListener('mouseup', MouseUp);
window.addEventListener('keydown', OnKeyDown);
