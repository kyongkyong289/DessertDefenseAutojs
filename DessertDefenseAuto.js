/* Dessert Defense Auto main script!!! */
//Game Variables
var canvas;
var context;
var canvasRect;

var sysVars = {
    mouseClickX : 0,
    mouseClickY : 0,
};

var gameVars = {
    scene : 'titlePage',
};

//Start, Update, Error
function start() {
    canvas = document.getElementById('gamecanvas');
    context = canvas.getContext('2d');
    canvasRect = canvas.getBoundingClientRect();

    canvas.addEventListener('click', onMouseClick, false);

    setInterval(update, 40);
}

function update() {
    display();
}

function onError(a, b, c) {
    alert(`${a} ${b} ${c}`);
}

window.onload = start;
window.onerror = onError;

//Input handle
function onMouseClick(event) {
    sysVars.mouseClickX = event.clientX - canvasRect.left;
    sysVars.mouseClickY = event.clientY - canvasRect.top;

    buttonHandle();
}

function buttonHandle() {
    if (gameVars.scene === 'titlePage') {
        gameVars.scene = 'levelSelect';
    }
}

function isInsideRect(x, y, rectLeft, rectTop, rectWidth, rectHeight) {
    if (x > rectLeft && x < rectLeft + rectWidth && y > rectTop && y < rectTop + rectHeight) {
        return true;
    }

    return false;
}

//Display
function display() {
    displayInit();

    if (gameVars.scene === 'titlePage') {
        displayTitlePage();
    }
}

function displayInit() {
    context.clearRect(0, 0, 1280, 720);
}

function displayTitlePage() {
    context.fillStyle = 'black';
    context.font = 'bold 72px sans-serif';

    context.fillText(`Dessert Defense`, gameUI.titlePage.titleTextBox[0], gameUI.titlePage.titleTextBox[1]);    
}
