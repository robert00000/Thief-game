class Scene2 extends Phaser.Scene{
    constructor(){
        super("scene2");
    }
    preload(){
        this.load.image('ground', './assets');
    }
    create(){

        player.x = 50;
        player.y = 450;

        this.movingPlatform = this.physics.add.image(400, 400, 'ground');

        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(100);
        this.physics.add.collider(player, this.movingPlatform);




        
        
    }
    update(){
        

        if (this.movingPlatform.x >= 500)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 300)
        {
            this.movingPlatform.setVelocityX(50);
        }
        if(keyR.isDown){
            this.scene.start('playScene');
        }
    }
}