class Instructions extends Phaser.Scene {
    constructor() {
        super('Instructions');
    }

    create() {
        //this.background = this.add.tileSprite(0, 0, 640, 960, 'background').setOrigin(0, 0);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FEFEFE',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let textConfig = {
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
        
        this.text1 = this.add.text(game.config.width/2, -100, 'Instructions', menuConfig).setOrigin(0.5);
        this.text2 = this.add.text(game.config.width/2, 700, 'Use Left and Right Arrow keys to Move, UP arrow key to jump.', textConfig).setOrigin(0.5);
        this.text3 = this.add.text(game.config.width/2 -100, 'sdfsdfsdf', textConfig).setOrigin(0.5);
      



        this.tweens.add({
            targets: this.text2,
            y: 100,
            duration: 500,
            ease: 'Power2',
           
        });
        this.tweens.add({
            targets: this.text1,
            y: 250,
            duration: 500,
            ease: 'Power2',
           
        });
        this.tweens.add({
            targets: this.text3,
            y: 300,
            //duration: 500,
            delay: 500,
            ease: 'Power2',
           
        });
        this.tweens.add({
            targets: this.text4,
            y: 350,
            //duration: 500,
            delay: 2000,
            ease: 'Power2',
           
        });
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // time = 0;
    }

    update() {
        
        // wait for UP input to restart game
        if (keyR.isDown) {
            this.sound.play('select');
            game.settings = 
            {
                gameTimer: 1000
            }
            
            // start next scene
            this.scene.start('playScene');
        }
        


        this.tweens.add({
            targets: endDate,
            y: 200,
            x: 300,
            duration: 500,
            ease: 'Power2',
            
        });
    }
}