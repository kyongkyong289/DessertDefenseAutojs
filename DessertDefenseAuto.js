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
    wave : 0,
    maxWave : 20,
    temp : 0,
    map : [],
};

var playerHero = {
    ID : -1,
    skills : [-1],
    life : 40,
    maxLife : 40,
    gold : 6,
    goldGen : [6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    hand : [-1, -1, -1, -1, -1, -1, -1, -1],
    sugar : 0,
    maxSugar : 3,
};

var shop = {
    itemPool : [0, 1],
    itemList : [-1, -1, -1, -1, -1, -1, -1],
    numOfItems : 4,
    selectedItem : -1,
    level : 1,
    exp : 0,
    locked : false,
    rerollCost : 2,
    lockCost : 0,
    upgradeCost : [[0, 0], [6, 6], [8, 8], [10, 10], [12, 12]],
};

//Start, Update, Error
function start() {
    canvas = document.getElementById('gamecanvas');
    context = canvas.getContext('2d');
    canvasRect = canvas.getBoundingClientRect();

    imageLoad();
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
                gameInit();
            }
        }
    } else if (gameVars.scene === 'mainGame') {
        if (isInsideRect(sysVars.mouseClickX, sysVars.mouseClickY, gameUI.mainGame.rerollButton[0], gameUI.mainGame.rerollButton[1], gameUI.mainGame.rerollButton[2], gameUI.mainGame.rerollButton[3])) {
            if (playerHero.gold >= shop.rerollCost) {
                playerHero.gold -= shop.rerollCost;
                reroll();
            }
        } else if (isInsideRect(sysVars.mouseClickX, sysVars.mouseClickY, gameUI.mainGame.upgradeButton[0], gameUI.mainGame.upgradeButton[1], gameUI.mainGame.upgradeButton[2], gameUI.mainGame.upgradeButton[3])) {
            if (playerHero.gold >= shop.upgradeCost[shop.level][shop.exp] && shop.level < 5) {
                playerHero.gold -= shop.upgradeCost[shop.level][shop.exp];
                if (shop.exp === 0) {
                    shop.exp += 1;
                } else {
                    shop.level += 1;
                    shop.exp = 0;
                }
            }
        } else if (isInsideRect(sysVars.mouseClickX, sysVars.mouseClickY, gameUI.mainGame.lockButton[0], gameUI.mainGame.lockButton[1], gameUI.mainGame.lockButton[2], gameUI.mainGame.lockButton[3])) {
            if (playerHero.gold >= shop.lockCost) {
                playerHero.gold -= shop.lockCost;

                if (shop.locked === true) {
                    shop.locked = false;
                } else {
                    shop.locked = true;
                }
            }
        } else if (isInsideRect(sysVars.mouseClickX, sysVars.mouseClickY, gameUI.mainGame.shopItemList[0], gameUI.mainGame.shopItemList[1], gameUI.mainGame.shopItemList[2], gameUI.mainGame.shopItemList[3]) {
            shop.selectedItem = Math.floor((sysVars.mouseClickX - gameUI.mainGame.shopItemList[0]) / gameUI.mainGame.shopItemSize[0]);
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
    displayDescription();
    displayArtifact();
    displayBar();
    displayBoard();
}

function displayShop() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.font = 'bold 24px sans-serif';
    context.lineWidth = 2;

    context.strokeRect(gameUI.backButton[0], gameUI.backButton[1], gameUI.backButton[2], gameUI.backButton[3]);

    context.strokeRect(gameUI.mainGame.shopArea[0], gameUI.mainGame.shopArea[1], gameUI.mainGame.shopArea[2], gameUI.mainGame.shopArea[3]);
    context.strokeRect(gameUI.mainGame.shopItemList[0], gameUI.mainGame.shopItemList[1], gameUI.mainGame.shopItemList[2], gameUI.mainGame.shopItemList[3]);
    context.strokeRect(gameUI.mainGame.rerollButton[0], gameUI.mainGame.rerollButton[1], gameUI.mainGame.rerollButton[2], gameUI.mainGame.rerollButton[3]);
    context.strokeRect(gameUI.mainGame.upgradeButton[0], gameUI.mainGame.upgradeButton[1], gameUI.mainGame.upgradeButton[2], gameUI.mainGame.upgradeButton[3]);
    context.strokeRect(gameUI.mainGame.lockButton[0], gameUI.mainGame.lockButton[1], gameUI.mainGame.lockButton[2], gameUI.mainGame.lockButton[3]);
    context.strokeRect(gameUI.mainGame.goldIcon[0], gameUI.mainGame.goldIcon[1], gameUI.mainGame.goldIcon[2], gameUI.mainGame.goldIcon[3]);
    context.strokeRect(gameUI.mainGame.sugarIcon[0], gameUI.mainGame.sugarIcon[1], gameUI.mainGame.sugarIcon[2], gameUI.mainGame.sugarIcon[3]);
    context.strokeRect(gameUI.mainGame.levelIcon[0], gameUI.mainGame.levelIcon[1], gameUI.mainGame.levelIcon[2], gameUI.mainGame.levelIcon[3]);
    context.strokeRect(gameUI.mainGame.expIcon[0], gameUI.mainGame.expIcon[1], gameUI.mainGame.expIcon[2], gameUI.mainGame.expIcon[3]);
    context.strokeRect(gameUI.mainGame.playerHand[0], gameUI.mainGame.playerHand[1], gameUI.mainGame.playerHand[2], gameUI.mainGame.playerHand[3]);

    context.drawImage(images.goldImage, gameUI.mainGame.goldIcon[0], gameUI.mainGame.goldIcon[1], gameUI.mainGame.goldIcon[2], gameUI.mainGame.goldIcon[3]);
    context.drawImage(images.sugarImage, gameUI.mainGame.sugarIcon[0], gameUI.mainGame.sugarIcon[1], gameUI.mainGame.sugarIcon[2], gameUI.mainGame.sugarIcon[3]);
    context.drawImage(images.rerollButton, gameUI.mainGame.rerollButton[0], gameUI.mainGame.rerollButton[1], gameUI.mainGame.rerollButton[2], gameUI.mainGame.rerollButton[3]); 
    context.drawImage(images.upgradeButton, gameUI.mainGame.upgradeButton[0], gameUI.mainGame.upgradeButton[1], gameUI.mainGame.upgradeButton[2], gameUI.mainGame.upgradeButton[3]);
    context.drawImage(images.goldImage2, gameUI.mainGame.rerollCost[0], gameUI.mainGame.rerollCost[1], gameUI.mainGame.rerollCost[2], gameUI.mainGame.rerollCost[3]);
    context.drawImage(images.goldImage2, gameUI.mainGame.upgradeCost[0], gameUI.mainGame.upgradeCost[1], gameUI.mainGame.upgradeCost[2], gameUI.mainGame.upgradeCost[3]);
    context.drawImage(images.goldImage2, gameUI.mainGame.lockCost[0], gameUI.mainGame.lockCost[1], gameUI.mainGame.lockCost[2], gameUI.mainGame.lockCost[3]);

    for (var i = 0; i < shop.numOfItems; i++) {
        context.drawImage(images.unitImages[shop.itemList[i]][1], gameUI.mainGame.shopItemList[0] + gameUI.mainGame.shopItemSize[0] * i, gameUI.mainGame.shopItemList[1], gameUI.mainGame.shopItemSize[0], gameUI.mainGame.shopItemSize[1]);
    }

    if (shop.locked === false) {
        context.drawImage(images.unlockButton, gameUI.mainGame.lockButton[0], gameUI.mainGame.lockButton[1], gameUI.mainGame.lockButton[2], gameUI.mainGame.lockButton[3]); 
    } else {
        context.drawImage(images.lockButton, gameUI.mainGame.lockButton[0], gameUI.mainGame.lockButton[1], gameUI.mainGame.lockButton[2], gameUI.mainGame.lockButton[3]); 
    }

    context.fillText(`Lv`, gameUI.mainGame.levelText2[0], gameUI.mainGame.levelText2[1]);
    context.fillText(`XP`, gameUI.mainGame.expText[0], gameUI.mainGame.expText[1]);
    context.fillText(`${playerHero.gold}`, gameUI.mainGame.goldText[0], gameUI.mainGame.goldText[1]);
    context.fillText(`${playerHero.sugar}/${playerHero.maxSugar}`, gameUI.mainGame.sugarText[0], gameUI.mainGame.sugarText[1]);
    context.fillText(`${shop.level}`, gameUI.mainGame.levelText[0], gameUI.mainGame.levelText[1]);

    context.fillText(`${shop.upgradeCost[shop.level][shop.exp]}`, gameUI.mainGame.upgradeText[0], gameUI.mainGame.upgradeText[1]);
    context.fillText(`${shop.rerollCost}`, gameUI.mainGame.rerollText[0], gameUI.mainGame.rerollText[1]);
    context.fillText(`${shop.lockCost}`, gameUI.mainGame.lockText[0], gameUI.mainGame.lockText[1]);

	context.fillStyle = 'turquoise';
    
    if (shop.exp >= 1) {
		context.fillRect(gameUI.mainGame.expBar[0][0], gameUI.mainGame.expBar[0][1], gameUI.mainGame.expBar[0][2], gameUI.mainGame.expBar[0][3]);
	}
    
    context.strokeRect(gameUI.mainGame.expBar[0][0], gameUI.mainGame.expBar[0][1], gameUI.mainGame.expBar[0][2], gameUI.mainGame.expBar[0][3]);
    context.strokeRect(gameUI.mainGame.expBar[1][0], gameUI.mainGame.expBar[1][1], gameUI.mainGame.expBar[1][2], gameUI.mainGame.expBar[1][3]);
}

function displayDescription() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.font = 'bold 24px sans-serif';
    context.lineWidth = 2;

    context.strokeRect(gameUI.mainGame.descriptionArea[0], gameUI.mainGame.descriptionArea[1], gameUI.mainGame.descriptionArea[2], gameUI.mainGame.descriptionArea[3]);
}

function displayArtifact() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.font = 'bold 24px sans-serif';
    context.lineWidth = 2;

    for (var i = 0; i < 3; i++) {
        context.strokeRect(gameUI.mainGame.artifacts[i][0], gameUI.mainGame.artifacts[i][1], gameUI.mainGame.artifacts[i][2], gameUI.mainGame.artifacts[i][3]);
    }
}

function displayBar() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.font = 'bold 24px sans-serif';
    context.lineWidth = 2;

    context.strokeRect(gameUI.mainGame.lifeIcon[0], gameUI.mainGame.lifeIcon[1], gameUI.mainGame.lifeIcon[2], gameUI.mainGame.lifeIcon[3]);
    context.strokeRect(gameUI.mainGame.waveIcon[0], gameUI.mainGame.waveIcon[1], gameUI.mainGame.waveIcon[2], gameUI.mainGame.waveIcon[3]);
    context.strokeRect(gameUI.mainGame.startButton[0], gameUI.mainGame.startButton[1], gameUI.mainGame.startButton[2], gameUI.mainGame.startButton[3]); 

    context.drawImage(images.lifeImage, gameUI.mainGame.lifeIcon[0], gameUI.mainGame.lifeIcon[1], gameUI.mainGame.lifeIcon[2], gameUI.mainGame.lifeIcon[3]); 
    context.drawImage(images.flagImage, gameUI.mainGame.waveIcon[0], gameUI.mainGame.waveIcon[1], gameUI.mainGame.waveIcon[2], gameUI.mainGame.waveIcon[3]);
    context.drawImage(images.flagImage, gameUI.mainGame.startButton[0], gameUI.mainGame.startButton[1], gameUI.mainGame.startButton[2], gameUI.mainGame.startButton[3]); 
    
    context.fillText(`${playerHero.life}/${playerHero.maxLife}`, gameUI.mainGame.lifeText[0], gameUI.mainGame.lifeText[1]);
    context.fillText(`${gameVars.wave}/${gameVars.maxWave}`, gameUI.mainGame.waveText[0], gameUI.mainGame.waveText[1]);
}

function displayBoard() {
    for (var i = 0; i < mapData.levels[0][1].length; i++) {
        for (var j = 0; j < mapData.levels[0][1][0].length; j++) {
            if (mapData.levels[0][1][i][j] === 1) {
                context.drawImage(images.terrains.grass[0][1], gameUI.mainGame.boardStart[0] + gameUI.mainGame.cellSize[0] * j, gameUI.mainGame.boardStart[1] + gameUI.mainGame.cellSize[1] * i, gameUI.mainGame.cellSize[0], gameUI.mainGame.cellSize[1]);
            } else {
                context.drawImage(images.terrains.dirt[0][1], gameUI.mainGame.boardStart[0] + gameUI.mainGame.cellSize[0] * j, gameUI.mainGame.boardStart[1] + gameUI.mainGame.cellSize[1] * i, gameUI.mainGame.cellSize[0], gameUI.mainGame.cellSize[1]);
            }
        }
    }
}
//Physics

//Game Logic
function gameInit() {
    playerHero.gold = 60;
    playerHero.suger = 0;
    playerHero.maxSugar = 3;
    playerHero.life = 30;
    playerHero.maxLife = 30;
    shop.level = 1;
    shop.exp = 0;
    shop.rerollCost = 2;
    shop.lockCost = 0;
    gameVars.wave = 0;
    gameVars.maxWave = 15;
    reroll();
}

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

function reroll() {
    var index = -1;

    for (var i = 0; i < shop.numOfItems; i++) {
        index = Math.floor(Math.random() * shop.itemPool.length);
        shop.itemList[i] = shop.itemPool[index];
    }
}
