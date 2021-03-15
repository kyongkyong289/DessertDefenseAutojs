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
    temp : 0,
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
    } else if (gameVars.scene === 'readyPage') {
        for (var i = 0; i < 4; i++) {
            if (isInsideRect(sysVars.mouseClickX, sysVars.mouseClickY, gameUI.readyPage.heroSkills[i][1], gameUI.readyPage.heroSkills[i][2], gameUI.readyPage.heroSkillSize[0], gameUI.readyPage.heroSkillSize[1])) {
                playerHero.skills[0] = i;
                gameVars.scene = 'mainGame';
            }
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
    } else if (gameVars.scene === 'readyPage') {
        displayReadyPage();
    } else if (gameVars.scene === 'mainGame') {
        displayMainGame();
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
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    
    context.strokeRect(gameUI.levelSelectPage.levels[0][1], gameUI.levelSelectPage.levels[0][2], gameUI.levelSelectPage.levelButtonSize[0], gameUI.levelSelectPage.levelButtonSize[1]);
}

function displayReadyPage() {
    context.strokeSytle = 'black';
    context.fillStyle = 'black';
    context.font = 'bold 48px sans-serif';
    context.lineWidth = 2;

    context.fillText('Select Your Skill', gameUI.readyPage.selectText[0], gameUI.readyPage.selectText[1]);

    for (var i = 0; i < 4; i++) {
        context.strokeRect(gameUI.readyPage.heroSkills[i][1], gameUI.readyPage.heroSkills[i][2], gameUI.readyPage.heroSkillSize[0], gameUI.readyPage.heroSkillSize[1]);
    }
}

function displayMainGame() {
    displayShop();
}

function displayShop() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.font = 'bold 24px sans-serif';
    context.lineWidth = 2;

    context.strokeRect(gameUI.mainGame.shopArea[0], gameUI.mainGame.shopArea[1], gameUI.mainGame.shopArea[2], gameUI.mainGame.shopArea[3]);
    context.strokeRect(gameUI.mainGame.shopItemList[0], gameUI.mainGame.shopItemList[1], gameUI.mainGame.shopItemList[2], gameUI.mainGame.shopItemList[3]);
    context.strokeRect(gameUI.mainGame.rerollButton[0], gameUI.mainGame.rerollButton[1], gameUI.mainGame.rerollButton[2], gameUI.mainGame.rerollButton[3]);
    context.strokeRect(gameUI.mainGame.upgradeButton[0], gameUI.mainGame.upgradeButton[1], gameUI.mainGame.upgradeButton[2], gameUI.mainGame.upgradeButton[3]);
    context.strokeRect(gameUI.mainGame.lockButton[0], gameUI.mainGame.lockButton[1], gameUI.mainGame.lockButton[2], gameUI.mainGame.shopArea[3]);
    context.strokeRect(gameUI.mainGame.descriptionArea[0], gameUI.mainGame.descriptionArea[1], gameUI.mainGame.descriptionArea[2], gameUI.mainGame.descriptionArea[3]);
}



//Physics

//Game Logic
function selectN(numberOfElements, n) {
    var pool = [];
    var results = [];
    var selectIndex = 0;

    for (var i = 0; i < n; i++) {
        pool.push(i);
    }

    if (numberOfElements <= n) {
        return pool;
    }

    for (var i = 0; i < n; i++) {
        selectIndex = Math.floor(Math.random() * pool.length);
        results.push(pool[selectIndex]);
        pool.splice(selectIndex, 1); 
    }

    return results;
}
