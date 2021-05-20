class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload(){
        //images and sounds go here.
        
        
        this.load.audio('select', './assets/Select.wav');
        this.load.audio('Footsteps', './assets/footsteps.wav');
        this.load.audio('Jump', './assets/Jump.mp3');

        this.load.image ('background','./assets/BG.png');
        this.load.image('Chest', './assets/Chest.png');
        this.load.image('Barrier', './assets/Barrier.png');
        this.load.image('Camera', './assets/Camera.png');
        this.load.image('Gem', './assets/Gem1.png');

    }
    create() {
        //this.background = this.add.tileSprite(0, 0, 640, 960, 'background').setOrigin(0, 0);
        //music configuration.
        var musicConfig = {
            mute: false,
            volume: .2,
            rate: .5,
            detune: 0,
            loop: true,
            delay: 0
        }
        //Looping background music.
        //this.music = this.sound.add('music');
        //this.music.play(musicConfig);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FEFEFE',
            align: 'center',
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
        //this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        var text1 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to Prototype platformer.', menuConfig).setOrigin(0.5);
        text1.setTint(0xff0000);
        //text2 = this.add.text(game.config.width/2, game.config.height/2, 'Use UP & DOWN arrows keys to move & (F) to fire', textConfig).setOrigin(0.5);
      
      
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press the R key to start the game\nPress E to see credits.', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height-200 + borderUISize + borderPadding, 'Move using the left and right arrow keys. press the up key to jump.', textConfig).setOrigin(0.5);
        
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        highScore = 0;
        
    }

    update() {
        //this.background.tilePositionX += 1;
        //Music looping
        


        if (keyR.isDown) {


            this.sound.play('select');
            
            //setting default time to 0 for timer
            game.settings = 
            {
                gameTimer: 1000
            }
            
            // start next scene
            this.scene.start('playScene');
        }
        if(keyE.isDown){
            //this.sound.play('sfx_spell');
            this.scene.start('Credits')
            this.sound.play('select');

        }
        
    }
}