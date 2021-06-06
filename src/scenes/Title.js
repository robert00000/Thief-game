class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload(){
        //images and sounds go here.
        
        
        this.load.audio('select', './assets/Select.wav');
        this.load.audio('Footsteps', './assets/footsteps5.wav');
        this.load.audio('Jump', './assets/Jump.wav');
        this.load.audio('collision', './assets/collision.wav');
        this.load.audio('pickup', './assets/pickup.wav');

        
        this.load.image('Gem', './assets/Gem1.png');
        this.load.image('title', './assets/Title_1.png');

    }
    create() {
        //this.background = this.add.tileSprite(0, 0, 640, 960, 'background').setOrigin(0, 0);
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'title');
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
        jumpConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0


        }
        //this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        // var text1 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to The Swindler.', menuConfig).setOrigin(0.5);
        //text1.setTint(0xff0000);
        //text2 = this.add.text(game.config.width/2, game.config.height/2, 'Use UP & DOWN arrows keys to move & (F) to fire', textConfig).setOrigin(0.5);
      
      
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press the R key to start the game\nPress E to see credits.\nPress F for instructions.', textConfig).setOrigin(0.5);
        
        this.text2 = this.add.text(game.config.width/2, 600 + borderUISize + borderPadding, 'Instructions: Move up by pressing the UP arrow key \nMove left and right using the LEFT RIGHT arrow keys.\nCollect the gems and progress to the next level.', textConfig).setOrigin(0.5);


        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        highScore = 0;

        jump = this.sound.add('Jump');
        
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
            this.sound.play('select');
            this.scene.start('Credits')
            

        }
        if(keyF.isDown){
            this.tweens.add({
                targets: this.text2,
                y: 400,
                duration: 500,
                ease: 'Power2',
               
            });
            
        }
        
        
    }
}