class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //this.load.image('Player', './assets/Knightp1.png');
        
        this.load.spritesheet('Player', './assets/KnightAnim2.png', {frameWidth: 71, frameHeight: 81, startFrame: 0, endFrame: 14});
        
    }
//Make player 2 as well as add some kind of music.

    create() 
    {   

        this.cameras.main.setSize(640, 480);
        
        //const cam2 = this.cameras.add(400, 0, 400, 300);

        //This is the create function which creates the playScene for the player.
        this.block = this.physics.add.sprite(300,30,'Block').setOrigin(0.5);
        //this.block.body.onCollide = true;
        this.block.body.onWorldBounds = true;
        this.block.body.onOverlap = true;
        this.block.setCollideWorldBounds(true);

        this.block2 = this.physics.add.sprite(600,10,'Block').setOrigin(0.5);
        this.block2.body.onWorldBounds = true;
        this.block2.body.onOverlap = true;
        this.block2.setCollideWorldBounds(true);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // some variables
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        movingPlatform = this.physics.add.image(200, 400, 'ground');

        movingPlatform.setImmovable(true);
        movingPlatform.body.allowGravity = false;
        movingPlatform.setVelocityX(50);

        
        
        player = this.physics.add.sprite(50, 450, 'Player').setOrigin(0.5);
        player.body.onCollide = true;      // must be set for collision event to work
        player.body.onWorldBounds = true;  // ditto for worldbounds
        player.setBounce(0.2);  
        player.setDebugBodyColor(0xFFFF00);
        player.setCollideWorldBounds(true);

        //Knight animations
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('Player', {start: 0, end: 14}),
            frameRate: 20,
            repeat: -1
        });

        // info text
        //this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        //this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move up and down.').setOrigin(0.5);
        

        
        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("gameOverScene");
        });


        let scoreConfig = 
        {
        fontFamily: 'Courier',
        fontSize: '28px',
        color: '#FEFEFE',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
        }

        // this.scoreRight = this.add.text(471, 54, this.p2Score, scoreConfig);
        scoreConfig.color = "#FF0000";
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;

        //creating play clock
        this.clock = this.time.delayedCall(startTime, () => {}, null, this); 

        //creates timer display
        //scoreConfig.color = "#843605";
        this.timer = this.add.text(game.config.width/2, 100, this.clock.getElapsedSeconds(), scoreConfig).setOrigin(0.5);
        


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
          }
        


        //Timer for the spawning of things.
        var timer = this.time.addEvent({
            delay: 500,                // ms
            //args: [],
            repeat: 4
        });

        //Adding collision 
        this.physics.add.collider(player, this.block);
        this.physics.add.collider(player, movingPlatform);
        //Camera following
        this.cameras.main.startFollow(player);

        
    }

  
    
    
    update(){
        
        this.moveText();
        
        //updates timer
        this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());
        //play animations
        player.anims.play('running', true);
        if(!this.physics.collide(player, this.block)){
            this.block.setVelocityX(0)
        }

        if(this.physics.collide(player, this.block2)){
            this.scene.isSleeping('playScene');
            this.scene.run('scene2');
            this.scene.setVisible('scene2'); 
        }

        //The speed for the background.
        //this.background.tilePositionX += 1;
        
        
        
        //  if(cursors.up.isDown) {
        //     player.body.setVelocityY(-500);
        //     //this.checkMovement();
        // } 
        // if(cursors.down.isDown) {
        //      player.body.setVelocityY(500);
        //      //this.checkMovement();
        // } 

        //Moves player left and right
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
        }   
        else{
            player.setVelocityX(0);
        }

        if(cursors.up.isDown ){
            player.setVelocityY(-300);
        }


        if (movingPlatform.x >= 500)
        {
            movingPlatform.setVelocityX(-50);
        }
        else if (movingPlatform.x <= 300)
        {
            movingPlatform.setVelocityX(50);
        }
        
    }
    //Could possibly randomize sprites positions.

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }



    
    
    moveText(){
        this.tweens.add({
            targets: this.clock.getElapsedSeconds(),
            y: 200,
            x: 300,
            duration: 500,
            ease: 'Power2',
            
        });
    }
    
}
