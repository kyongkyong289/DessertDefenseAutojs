var gameData = {
    heroSkillExplanations : [[0, 'Deal 10 Damage to all enemies in one tile.'],
                             [1, 'Deal 25 Damage to random 3 enemies.'],
                             [2, 'Summon one unit'],
                             [3, 'Summon two units.']],

    heroSkills : [0, 1, 2, 3],
};

//Numbers : 0 for path, 1 for block, 2 for hero position, 3 for spawnpoints.
var mapData = {
    levels : [[0, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                   [1, 1, 1, 0, 0, 0, 0, 0, 3, 1],
                   [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
                   [1, 2, 0, 0, 1, 1, 0, 1, 1, 1],
                   [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
                   [1, 1, 1, 0, 0, 0, 0, 0, 3, 1],
                   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]]],
};
