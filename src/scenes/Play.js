class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        
        this.load.spritesheet('Player', './assets/character.png', {frameWidth: 71, frameHeight: 81, startFrame: 0, endFrame: 14});
        this.load.image('microtileset', './assets/tileset1.png');
        this.load.image('2xtileset', './assets/tileset2@2x.png');
        this.load.tilemapTiledJSON('tilemapJSON', './assets/Tilemaps/Map1.json');
        
    }
    
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

        //This is where we read files for this scenes map.
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset1', 'microtileset');
        const tileset2x = map.addTilesetImage('tileset2', '2xtileset');
        //Background layer for the map.
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

        //this.exit = this.physics.add(600, 600, 'Gem');
        
        const p1Spawn = map.findObject('p1Spawn', obj => obj.name === 'Spawns');

        const itemSpawn = map.createFromObjects('Objects', {gid: 31, key:'Gem'});
        
        const exit = map.findObject('Transition', obj => obj.name === 'exit');
        
        
        this.spawnx = p1Spawn.x;
        this.spawnY = p1Spawn.y;


        //Debug to show different values
        
        const gem = this.add.image(75,15, 'Gem').setScale(.5,.5);
        score = 0;
        
        scoreText = this.add.text(85, 10, '', { font: '16px Courier', fill: '#FEFEFE' });
        this.data.set('score', ' ' + score );
        scoreText.setText([
            'X' + this.data.get('score')
        ]);

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

        //Camera settings for this scene.

        // this.cursors = this.input.keyboard.createCursorKeys();
        // this.cameras.main.setSize(640, 480);
        // this.cameras.main.setBounds(0,0,1920,1080);
        //this.cameras.main.zoom = 2
        //const cam2 = this.cameras.add(400, 0, 400, 300);
        //this.background = this.add.tileSprite(0, 0, 640, 960,'background').setOrigin(0, 0);
        
        
        // this.block2 = this.physics.add.sprite(600,600,'Gem').setOrigin(0.5);
        // this.block2.body.onWorldBounds = true;
        // this.block2.body.setImmovable = true;
        // this.block2.body.onOverlap = true;
        // this.block2.setCollideWorldBounds(true);

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
            allowGravity: false, 
        });

        

        //Adds all the id's
        this.emeralds.addMultiple(itemSpawn);
        
        
        this.emeralds.children.iterate((child) =>{
            child.setScale(.5,.5);
        })

        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("gameOverScene");
        });


        

        
        
        
        this.footsteps = this.sound.add('Footsteps');
        footstepConfig = {
            mute: false,
            volume: 1,
            rate: 1,
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
        this.physics.add.collider(platforms, terrainLayer);
        
        this.physics.add.collider(this.emeralds, terrainLayer);

        
        //this.physics.add.collider(player, hazardLayer);
        //Next layer will be for the hazards.

        //Camera following
        this.cameras.main.startFollow(player);

        this.physics.add.collider(player, this.emeralds, this.collectGem, null, this);
        this.physics.add.overlap( player, hazardLayer);
        this.physics.add.overlap(player, exit, this.exitScene)
    }

    
    
    
    update(){
        
        //this.moveText();
        player.update();
        //updates timer
        //this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());
        

        if(this.physics.collide(player, this.hazard)){
            this.footsteps.mute = true;
            this.resetPlayer();
            this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
              });
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
    //Could possibly be used to randomize sprites positions.
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    //This disables the item that collides with the player to make it look as though it has been collected.
    collectGem (player, gem)
    {   
        gem.x = -300;
        gem.alpha = 0;
        //Might end up adding an extra point for some reason. Might be because of lag.
        if(score == 0){
            score = 1;
        }
        else{
            score += 1;
        }
        scoreText.setText('X ' + score);
        
        
    }
    //This starts the scene to the very beginning.
    resetPlayer(){
        this.scene.start('playScene');
        
    }
    exitScene(){
        this.scene.start('scene2');
    }
    
}
