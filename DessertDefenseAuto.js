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
    selectedLevel : -1,
};

var playerHero = {
    ID : -1,
    skills : [-1],
    life : 0,
    gold : 0,
    sugar : 0,
};

var shop = {
    itemList : [-1, -1, -1, -1, -1, -1, -1, -1],
    numOfItems : 4,
    selectedItem : -1,
    level : 1,
    rerollCost : 2,
    upgradeCost : [[6, 6], [8, 8], [10, 10], [12, 12]],
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
    } else if (gameVars.scene === 'levelSelect') {
        if (isInsideRect(sysVars.mouseClickX, sysVars.mouseClickY, gameUI.levelSelectPage.levels[0][1], gameUI.levelSelectPage.levels[0][2], gameUI.levelSelectPage.levelButtonSize[0], gameUI.levelSelectPage.levelButtonSize[1])) {
            gameVars.selectedLevel = 0;
            gameVars.scene = 'readyPage';
        }
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
    } else if (gameVars.scene === 'levelSelect') {
        displayLevelSelectPage();
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

function displayLevelSelectPage() {
    context.fillStyle = 'black';
    
    context.strokeRect(gameUI.levelSelectPage.levels[0][1], gameUI.levelSelectPage.levels[0][2], gameUI.levelSelectPage.levelButtonSize[0], gameUI.levelSelectPage.levelButtonSize[1]);

}
