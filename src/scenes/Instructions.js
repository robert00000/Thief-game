class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionScene');
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
            fontSize: '18px',
            color: '#FEFEFE',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(game.config.width/2, 70, 'Instructions', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 200, ' You are playing as a thief who has just broken into a famous museum.\n Collect as many gems as you can while avoiding the hazardous obstacles.\n Use Left and Right arrow keys to move, Up arrow key to jump.\n Hitting an obstacle will send you back to the beginning.', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 350, 'Press R to start the game.', textConfig).setOrigin(0.5);
           
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       
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
    }
}