class Scene2 extends Phaser.Scene{
    constructor(){
        super("scene2");
    }
    preload(){
        this.load.image('ground', './assets');
    }
    init(){

    }
    create(){
        this.cameras.main.setSize(640, 480);
        this.cameras.main.setBounds(0,0,1920,1080);

        this.background = this.add.tileSprite(0, 0, 640, 960,'background').setOrigin(0, 0);

        
        player = new Player(this, 50, 450, 'Player').setOrigin(0.5);

        player.body.onCollide = true;      // must be set for collision event to work
        player.body.onWorldBounds = true;  // ditto for worldbounds
        //player.setBounce(0.2);  
        player.setDebugBodyColor(0xFFFF00);
        player.setCollideWorldBounds(true);

        this.movingPlatform = this.physics.add.image(100, 100, 'Camera');

        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(100);
        
        //Knight animations
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('Player', {start: 0, end: 14}),
            frameRate: 20,
            repeat: -1
        });

        //This is the create function which creates the playScene for the player.
        this.block = this.physics.add.sprite(0,200,'Gem').setOrigin(0.0);
        this.block.body.onWorldBounds = true;
        this.block.body.setImmovable = true;
        this.block.body.onOverlap = true;
        this.block.setCollideWorldBounds(true);
        this.block.setVisible = false;
        this.platform = this.physics.add.sprite(0,300, 'Barrier');
        this.platform.setImmovable(true);
        this.platform.body.setSize(100,100);
        this.platform.body.allowGravity = false;

        this.platform2 = this.physics.add.sprite(300,400, 'Barrier');
        this.platform2.setImmovable(true);
        this.platform2.body.setSize(100,100);
        this.platform2.body.allowGravity = false;

        //this.physics.add.collider(player, this.block);
        this.physics.add.collider(player, this.movingPlatform);
        this.physics.add.collider(this.block, this.platform);
        this.physics.add.collider(player, this.platform2);
        this.physics.add.collider(player, this.platform);
        //Camera following
        this.cameras.main.startFollow(player);
    }
    update(){

        player.anims.play('running', true);
        player.update();

        
        if(this.physics.collide(player, this.block)){
            //this.scene.sleep('scene2')
            
            this.scene.start('playScene');
            
        }
        if (this.movingPlatform.x >= 500)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 300)
        {
            this.movingPlatform.setVelocityX(50);
        }
        
        


    }
}