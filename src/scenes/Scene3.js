class Scene3 extends Phaser.Scene{
    constructor(){
        super("scene3");
    }
    preload(){
        
        this.load.image('microtileset', './assets/tileset1.png');
        this.load.image('2xtileset', './assets/tileset2@2x.png');
        this.load.tilemapTiledJSON('tilemapJSON3', './assets/Tilemaps/Map3.json');
        this.load.atlas('thief', 'assets/thief.png', 'assets/thief.json');
        this.load.atlas('collect', 'assets/Collect.png', 'assets/Collect.json');
        this.load.image('LStill', './assets/LStill.png');
        this.load.image('RStill', './assets/RStill.png');
        
    }
    
    create() {   
        //Thief sprite
        this.anims.create({
            key: 'leftstill',
            frames: this.anims.generateFrameNames('thief', { prefix: 'LStill', end: 0}),
        });

        this.anims.create({
            key: 'rightstill',
            frames: this.anims.generateFrameNames('thief', { prefix: 'RStill', end: 0}),
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('thief', { prefix: 'L', end: 6 }),
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('thief', { prefix: 'R', end: 6 }),
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: 'jumpleft',
            frames: this.anims.generateFrameNames('thief', { prefix: 'JL', end: 5 }),
        });

        this.anims.create({
            key: 'jumpright',
            frames: this.anims.generateFrameNames('thief', { prefix: 'JR', end: 5 }),
        });

        //Collection anim
        this.anims.create({
            key: 'Collect',
            frames: this.anims.generateFrameNames('collect', { prefix: 'Collect', end: 6}),
            hideOnComplete: true
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

        //This is where we read files for this scenes map.
        const map = this.add.tilemap('tilemapJSON3');
        const tileset = map.addTilesetImage('tileset1', 'microtileset');
        const tileset2x = map.addTilesetImage('tileset2', '2xtileset');
        //Background layer for the map.
        const bgLayer = map.createLayer('BG', tileset, 0, 0);

        //const itemLayer = map.createLayer('Item', tileset, 0, 0);
        const hazardLayer = map.createLayer('Hazard', tileset2x, 0, 0);
        
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);
        
        const transitionLayer = map.createLayer('Transition', tileset, 0, 0);

        // const hiddenLayer = map.createLayer('Hidden wall1', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({
            collides: true
        });
        hazardLayer.setCollisionByProperty({
            collides: true
        });
        transitionLayer.setCollisionByProperty({
            collides: true
        })
        
        this.hazard = hazardLayer;
        this.exit = transitionLayer;
        //this.exit = this.physics.add(600, 600, 'Gem');
        
        const p1Spawn = map.findObject('p1Spawn', obj => obj.name === 'Spawns');

        const itemSpawn = map.createFromObjects('Objects', {gid: 31, key:'Gem'});
        
        //const playerExit = map.findObject('Transition', obj => obj.name === 'exit');
        
        
        this.spawnx = p1Spawn.x;
        this.spawnY = p1Spawn.y;

        this.initCount = mapCount;
        mapCount = this.initCount;
        //Debug to show different values
        
        
        score = mapCount;
        
        //scoreText = this.add.text(85, 10, '', { font: '16px Courier', fill: '#FEFEFE' });
        this.data.set('score', ' ' + 0 );
        

        player = new Player(this, this.spawnx, this.spawnY, 'RStill');
        
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

        this.cursors = this.input.keyboard.createCursorKeys();
        //this.cameras.main.setSize(640, 480);
        //this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.zoom = 1.15;

        scoreText = this.add.text(220, 60, '', { font: '16px Courier', fill: '#FEFEFE' }).setScrollFactor(0).setFontSize(16).setColor('#ffffff');
        scoreText.setText('X ' + score);
        deathText = this.add.text(300, 60, '', { font: '16px Courier', fill: '#FEFEFE' }).setScrollFactor(0).setFontSize(16).setColor('#ffffff');
        deathText.setText('Deaths ' + dCounter);
        const gem = this.add.image(200, 65, 'Gem').setScale(.5,.5).setScrollFactor(0);
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
        let swap = this.input.keyboard.addKey('S');
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
    }

    
    
    
    update(){
        
        //this.moveText();
        //Player updating
        player.update();
        if (cursors.left.isDown && player.body.blocked.down)
        {
            forward = false;
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown && player.body.blocked.down)
        {
            forward = true;
            player.anims.play('right', true);
        }   
        else{
            if (forward) {
                if(!player.body.blocked.down){
                    player.anims.play('jumpright');
                }else{
                    player.anims.play('rightstill');
                }
            }else{
                if(!player.body.blocked.down){
                    player.anims.play('jumpleft');
                }else{
                    player.anims.play('leftstill');
                }
            }
        }
        //updates timer
        //this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());
        const cam = this.cameras.main;

        if(this.physics.collide(player, this.hazard)){
            this.sound.play('collision');
            this.resetPlayer();
            dCounter += 1;
            if (cam.deadzone){
                deathText.setText('Deaths: ' + dCounter);
            }

            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
              });

        }
        if(this.physics.collide(player, this.exit)){
            this.sound.play('pickup');
            this.exitScene();
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
        this.sound.play('pickup');
        const cam = this.cameras.main;
        gem.anims.play('Collect');
        gem.body.destroy();
        //Might end up adding an extra point for some reason. Might be because of lag in the collision system.
        
        score += 1;
        
        if (cam.deadzone){
            scoreText.setText('X ' + score);
        }
        
    }
    //This starts the scene to the very beginning.
    resetPlayer(){
        this.sound.stopByKey('Footsteps');
        this.scene.start('scene3');
    }
    exitScene(){
        this.sound.stopByKey('Footsteps');
        this.scene.start('scene3');
    }
    
}
