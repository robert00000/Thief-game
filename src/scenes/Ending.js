class Ending extends Phaser.Scene {
    constructor() {
        super('endScene');
    }

    create() {
        const map = this.add.tilemap('titleMap');
        const tileset = map.addTilesetImage('tileset1', 'microtileset');


        const bgLayer = map.createLayer('BG', tileset, 0, 0);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: '#FEFEFE',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let textConfig = {
            fontFamily: 'Arial',
            fontSize: '8px',
            color: '#FEFEFE',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        

        // if(time > highScore){
        //     highScore = time;
        //     highScore = highScore.toFixed(2);
        // }

        time = time.toFixed(2);
        
        this.text1 = this.add.text(game.config.width/2, -100 - borderUISize - borderPadding, 'You have beaten the game!\nScore: ' + score + ' ' +' Deaths: ' + dCounter + ' \nPress R to go back to title and E to see credits.', menuConfig).setOrigin(0.5);
        if(score < 30 && dCounter == 0){
            this.add.text(game.config.width/2,  100, 'You did not fall to greed and focused \nupon the most important goal in which you have \nchosen to achieve.\nYou have maintained your composure.', menuConfig).setOrigin(0.5)
        }
        if(score >= 30 && dCounter > 0){
            this.add.text(game.config.width/2,  100, 'You have collected a majority of the gems inside \nof the mueseum but at what cost?.\nYou have become the master of tripping wires.', menuConfig).setOrigin(0.5)
        }
        if(score <= 30 && dCounter > 0){
            this.add.text(game.config.width/2,  100, 'Not only were you unable to get enough \nyou were reckless but you still achieved your goal.\nYou are a master... at getting caught', menuConfig).setOrigin(0.5)
        }
        if(score >= 30 && dCounter == 0){
            this.add.text(game.config.width/2,  100, 'You have not only collected enough for yourself\nYou have achieved your goal!\nYou are a legendary master thief', menuConfig).setOrigin(0.5)
        }
        // this.tweens.add({
        //     targets: this.text2,
        //     y: 250,
        //     duration: 500,
        //     ease: 'Power2',
            
        // });
        this.tweens.add({
            targets: this.text1,
            y: 200,
            duration: 500,
            ease: 'Power2',
            
        });
        // this.tweens.add({
        //     targets: this.text3,
        //     y: 300,
        //     //duration: 500,
        //     delay: 500,
        //     ease: 'Power2',
            
        // });
        // this.tweens.add({
        //     targets: this.text4,
        //     y: 350,
        //     //duration: 500,
        //     delay: 2000,
        //     ease: 'Power2',
            
        // });
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        time = 0;
    }

    update() {
        
        // wait for UP input to restart game
        if (keyR.isDown) {
            this.sound.play('select');
            this.sound.stopByKey('bgm');
            // start next scene
            this.scene.start('titleScene');
        }
        if(this.keyE.isDown){
            this.sound.play('select');
            this.scene.start('Credits')
        }


        // this.tweens.add({
        //     targets: endDate,
        //     y: 200,
        //     x: 300,
        //     duration: 500,
        //     ease: 'Power2',
            
        // });
    }
}