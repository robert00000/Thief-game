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




        
        player = new Player(this, 50, 450, 'Player').setOrigin(0.5);

        player.body.onCollide = true;      // must be set for collision event to work
        player.body.onWorldBounds = true;  // ditto for worldbounds
        //player.setBounce(0.2);  
        player.setDebugBodyColor(0xFFFF00);
        player.setCollideWorldBounds(true);

        this.movingPlatform = this.physics.add.image(200, 600, 'ground');

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
        this.block = this.physics.add.sprite(300,50,'ground').setOrigin(0.5);
        this.block.body.onWorldBounds = true;
        this.block.body.setImmovable = true;
        this.block.body.onOverlap = true;
        this.block.setCollideWorldBounds(true);

        //this.physics.add.collider(player, this.block);
        this.physics.add.collider(player, this.movingPlatform);
        
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