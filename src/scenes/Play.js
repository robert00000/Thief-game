class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //this.load.image('Player', './assets/Knightp1.png');
        
        this.load.spritesheet('Player', './assets/character.png', {frameWidth: 71, frameHeight: 81, startFrame: 0, endFrame: 14});
        this.load.image('microtileset', './assets/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', './assets/Tilesettutorial.json');
        
    }
//Make player 2 as well as add some kind of music.

    create() {   
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'microtileset');
        const bgLayer = map.createLayer('BG', tileset, 0, 0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);

        terrainLayer.setCollisionByProperty({
            collides: true
        });

        // Code for where the player is defined.
         
        const p1Spawn = map.findObject('Spawns', obj => obj.name === 'p1Spawn');
        player = new Player(this, p1Spawn.x, p1Spawn.y, 'Player');
        
        player.body.onCollide = true;      // must be set for collision event to work
        player.body.onWorldBounds = true;  // ditto for worldbounds
        //player.setBounce(0.2);  
        player.setDebugBodyColor(0xFFFF00);
        player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);

        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(player, terrainLayer);

        this.cursors = this.input.keyboard.createCursorKeys();
        // this.cameras.main.setSize(640, 480);
        // this.cameras.main.setBounds(0,0,1920,1080);
        //const cam2 = this.cameras.add(400, 0, 400, 300);
        //this.background = this.add.tileSprite(0, 0, 640, 960,'background').setOrigin(0, 0);
        //This is the create function which creates the playScene for the player.
        this.block = this.physics.add.sprite(100,600,'Chest').setOrigin(0.5);
        //this.block.body.onCollide = true;
        this.block.body.onWorldBounds = true;
        this.block.body.setImmovable = true;
        this.block.body.onOverlap = true;
        this.block.setCollideWorldBounds(true);

        this.block2 = this.physics.add.sprite(600,600,'Gem').setOrigin(0.5);
        this.block2.body.onWorldBounds = true;
        this.block2.body.setImmovable = true;
        this.block2.body.onOverlap = true;
        this.block2.setCollideWorldBounds(true);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // some variables
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'Barrier').setScale(2).refreshBody();
        
        // movingPlatform = this.physics.add.image(300, 300, 'Barrier');
        // movingPlatform.body.setSize(100,100);
        
        // movingPlatform.setImmovable(true);
        // movingPlatform.body.allowGravity = false;
        // movingPlatform.setVelocityX(50);

        // this.platform = this.physics.add.sprite(100, 200, 'Chest');
        // this.platform.setImmovable(true);
        // this.platform.body.setSize(50,50);
        // this.platform.body.allowGravity = false;

        
        platforms.add(this.block);
        

        // info text
        //this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        //this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move up and down.').setOrigin(0.5);
        // Objects for this scene
        this.emeralds = this.physics.add.group({
            key: 'Gem',
            repeat: 5,
            setXY: { x: 100, y: 120, stepX: 50 },
            allowGravity: false
        });
        
        this.emeralds2 = this.physics.add.group({
            key: 'Gem',
            repeat: 2,
            setXY: {x: 100, y: 250, stepX: 50},
            allowGravity: false
        })
        
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
        //this.clock = this.time.delayedCall(startTime, () => {}, null, this); 

        //creates timer display
        //scoreConfig.color = "#843605";
        //this.timer = this.add.text(game.config.width/2, 100, this.clock.getElapsedSeconds(), scoreConfig).setOrigin(0.5);
        


        
        
        this.footsteps = this.sound.add('Footsteps');
        footstepConfig = {
            mute: false,
            volume: .2,
            rate: .5,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0


        }

        //Timer for the spawning of things.
        var timer = this.time.addEvent({
            delay: 500,                // ms
            //args: [],
            repeat: 4
        });

        //Adding collision 
        //this.physics.add.collider(player, platforms);
        this.physics.add.collider(platforms, terrainLayer);
        //this.physics.add.collider(player, movingPlatform);
        //this.physics.add.collider(this.platform, player);
        this.physics.add.collider(this.emeralds, terrainLayer);
        this.physics.add.collider(this.emeralds2, terrainLayer);
        //Camera following
        this.cameras.main.startFollow(player);

        
    }

    
    
    
    update(){
        
        //this.moveText();
        player.update();
        //updates timer
        //this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());
        //play animations
        // this.scoreCheck(player, this.emeralds);
        // this.scoreCheck(player,this.emeralds2);
        if(!this.physics.collide(player, this.block)){
            
            this.block.setVelocityX(0)
        }

        if(this.physics.collide(player, this.block2)){
            //this.scene.sleep('playScene');
            playerX = player.x
            this.sound.play('select');
            this.scene.start('scene2');
             
        }
        if (cursors.up.isDown && player.body.blocked.down ){
            jump.play(jumpConfig);
        }
        

        if(cursors.right.isDown || cursors.left.isDown){
            if(this.footsteps.mute){
                this.footsteps.play(footstepConfig);
                this.footsteps.mute = false;
            }
        }
        else{
            this.footsteps.mute = true;
        }
        

        // if (movingPlatform.x >= 500)
        // {
        //     movingPlatform.setVelocityX(-50);
        // }
        // else if (movingPlatform.x <= 300)
        // {
        //     movingPlatform.setVelocityX(50);
        // }
        
    }
    //Could possibly randomize sprites positions.
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    collectGem (player, gem)
    {   
        gem.disableBody(true, true);
    }

    scoreCheck(player, gem){
         if(this.physics.collide(player,gem)){
             score += 1;
         }
     }
    
    // moveText(){
    //     this.tweens.add({
    //         targets: this.clock.getElapsedSeconds(),
    //         y: 200,
    //         x: 300,
    //         duration: 500,
    //         ease: 'Power2',
            
    //     });
    // }
    
}
