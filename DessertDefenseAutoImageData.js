var images = {
    goldImage : new Image(),
    goldImage2 : new Image(),
    lifeImage : new Image(),
    sugarImage : new Image(),
    flagImage : new Image(),

    rerollButton : new Image(),
    upgradeButton : new Image(),
    lockButton : new Image(),
    unlockButton : new Image(),

    unitImages : [[0, new Image()],
                  [1, new Image()],
                  [2, new Image()],
                  [3, new Image()]],
    unitsOnBoard : new Image(),
};

function imageLoad() {
    images.goldImage.src = 'Images/GoldImage.png';
    images.goldImage2.src = 'Images/GoldImage2.png';
    images.lifeImage.src = 'Images/LifeImage.png';
    images.sugarImage.src = 'Images/SugarImage.png';
    images.flagImage.src = 'Images/FlagImage.png';

    images.rerollButton.src = 'Images/RerollButton.png';
    images.upgradeButton.src = 'Images/UpgradeButton.png';
    images.lockButton.src = 'Images/LockButton.png';
    images.unlockButton.src = 'Images/UnlockButton.png';

    images.unitImages[0][1].src = 'Images/Unit01.png';
    images.unitImages[1][1].src = 'Images/Unit02.png';
}
