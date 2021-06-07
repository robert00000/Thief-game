//Collaborators Robert Williams, Carey Wang and Aaron Tishler
// The Swindler     
//Date completed: 6/7/21
//The ICING
//Double jumps have been implemented as well as tiled inside of our project.
//Program uses tiled to get data for objects that have been placed and updates the score whenever the
//player collides with these objects. Hazards are their own layer and it updates the death counter.
//There are some "Secret" areas in the game that gives the player access to more loot which can help the player.
//towards gaining different ending text.
//There is a variety of different endings that depend upon the player's score as well as their deaths.
//this ending text varies depending upon how much the player had collected or died if at all allowing for dynamic endings.
//At the start of different scenes there is advice, instructions or story elements.
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
    scene: [ Title, Scene1, Ending, Credits , Scene2, Scene3 ]   
    
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
let advice = false, advice2 = false;
// this is to detect the time elapsed
let startTime = new Date();
let endTime = new Date();
let initCount = 0, initCount2 = 0, initCount3 = 0;
