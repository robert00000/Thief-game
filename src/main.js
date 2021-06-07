//Collaborators Robert Williams, Carey Wang and Aaron Tishler
// The Swindler     
//Date completed: 6/7/21

"use strict";

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 300
            }
        }
    },
    scene: [ Title, Play, GameOver, Credits , Scene2, Scene3 ]   
    
}

let game = new Phaser.Game(config);
let scoreText;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let platforms;
let movingPlatform;
// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, xPosition,yPosition, keyUP, keyDOWN, keyE;
let character = null;
let centerX = game.config.width/2, centerY = game.config.height/2;
let player;
let playerX = 50, playerY = 450;
const textSpacer = 64;
let footstepConfig;
let highScore, score = 0;
let newHighScore = false;
let forward = true;
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;
let cursors = null;
let jump, jumpConfig;
let music, musicConfig;
let mapCount = 0;
let time = 0;
let dCounter = 0;
let deathText = 0;
// this is to detect the time elapsed
let startTime = new Date();
let endTime = new Date();
let initCount = 0, initCount2 = 0, initCount3 = 0;
