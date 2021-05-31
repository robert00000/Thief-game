class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //this.load.image('Player', './assets/Knightp1.png');
        
        this.load.spritesheet('Player', './assets/character.png', {frameWidth: 71, frameHeight: 81, startFrame: 0, endFrame: 14});
        this.load.image('microtileset', './assets/tileset1.png');
        this.load.image('2xtileset', './assets/tileset2@2x.png');
        this.load.tilemapTiledJSON('tilemapJSON', './assets/Tilemaps/Map1.json');
        
    }
//Make player 2 as well as add some kind of music.
    
    create() {   


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


        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset1', 'microtileset');
        const tileset2x = map.addTilesetImage('tileset2', '2xtileset');

        const bgLayer = map.createLayer('BG', tileset, 0, 0);

        //const itemLayer = map.createLayer('Item', tileset, 0, 0);
        const hazardLayer = map.createLayer('Hazard', tileset2x, 0, 0);
        
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);

        terrainLayer.setCollisionByProperty({
            collides: true
        });
        hazardLayer.setCollisionByProperty({
            collides: true
        });
        
        
        this.hazard = hazardLayer;

        
        const p1Spawn = map.findObject('p1Spawn', obj => obj.name === 'Spawns');
        
        this.spawnx = p1Spawn.x;
        this.spawnY = p1Spawn.y;

        player = new Player(this, this.spawnx, this.spawnY, 'Player');
        
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
        
        this.block2 = this.physics.add.sprite(600,600,'Gem').setOrigin(0.5);
        this.block2.body.onWorldBounds = true;
        this.block2.body.setImmovable = true;
        this.block2.body.onOverlap = true;
        this.block2.setCollideWorldBounds(true);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // some variables
        platforms = this.physics.add.staticGroup();

        
        // movingPlatform = this.physics.add.image(300, 300, 'Barrier');
        // movingPlatform.body.setSize(100,100);
        
        // movingPlatform.setImmovable(true);
        // movingPlatform.body.allowGravity = false;
        // movingPlatform.setVelocityX(50);

        // this.platform = this.physics.add.sprite(100, 200, 'Chest');
        // this.platform.setImmovable(true);
        // this.platform.body.setSize(50,50);
        // this.platform.body.allowGravity = false;

        
        
        

        // info text
        //this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        //this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move up and down.').setOrigin(0.5);
        // Objects for this scene
        this.emeralds = this.physics.add.group({
            key: 'Gem',
            allowGravity: false,
            setXY: {x: 150, y: 100},
            setScale: { x: 0.5, y: 0.5}
        });
        
        this.gem1 = this.physics.add.sprite(100,250,'Gem').setOrigin(0.5).setScale(.5, .5);
        this.gem2 = this.physics.add.sprite(200,250,'Gem').setOrigin(0.5).setScale(.5, .5);
        this.gem3 = this.physics.add.sprite(500,250,'Gem').setOrigin(0.5).setScale(.5, .5);
        this.gem4 = this.physics.add.sprite(14.67,459.50,'Gem').setOrigin(0.5).setScale(.5, .5);
        this.emeralds.add(this.gem1);
        this.emeralds.add(this.gem2);
        this.emeralds.add(this.gem3);
        this.emeralds.add(this.gem4);
        
        
        

        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("gameOverScene");
        });


        

        
        
        
        this.footsteps = this.sound.add('Footsteps');
        footstepConfig = {
            mute: false,
            volume: .3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0


        }

        //Displays the score.
        this.scoreDisplay = this.add.text(game.config.width/2, 72, score, scoreConfig).setOrigin(0.5);

        //Timer for the spawning of things.
        var timer = this.time.addEvent({
            delay: 500,                // ms
            //args: [],
            repeat: 4
        });

        //Adding collision 
        this.physics.add.collider(platforms, terrainLayer);
        
        this.physics.add.collider(this.emeralds, terrainLayer);

        
        //this.physics.add.collider(player, hazardLayer);
        //Next layer will be for the hazards.

        //Camera following
        this.cameras.main.startFollow(player);

        this.physics.add.overlap(player, this.emeralds, this.collectGem, null, this);
        this.physics.add.overlap( player, hazardLayer);
    }

    
    
    
    update(){
        
        //this.moveText();
        player.update();
        //updates timer
        //this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());
        //play animations
        // this.scoreCheck(player, this.emeralds);
        // this.scoreCheck(player,this.emeralds2);
        

        if(this.physics.collide(player, this.block2)){
            //this.scene.sleep('playScene');
            playerX = player.x
            this.sound.play('select');
            this.scene.start('scene2');
             
        }
        if(this.physics.collide(player, this.hazard)){
            this.sound.play('collision');
            this.resetPlayer();
            this.footsteps.mute = true;
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
              });
        }
        // if(this.physics.collide(player, hazardLayer)){
        //     player.x = p1Spawn.x;
        //     player.y = p1SPawn.y
        // }
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
        
        if(this.physics.collide(player, this.emeralds)){
            score += 1;
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
    //This disables the item that collides with the player to make it look as though it has been collected.
    collectGem (player, gem)
    {   
        gem.disableBody(true, true);
        this.sound.play('pickup');
        
    }
    //This is meant to increment the score.
    scoreCheck(player, gem){
         if(this.physics.collide(player,gem)){
             score += 1;
         }
     }
    //This starts the scene to the very beginning.
    resetPlayer(){
        this.scene.start('playScene');
        
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
