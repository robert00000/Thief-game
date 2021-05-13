class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame){
        // call Phaser Physics Sprite constructor
        super(scene, x, y, key, frame);
        // setup Physics Sprite
        scene.add.existing(this);               // make it real
        scene.physics.add.existing(this);       // add physics body
        
        

        cursors = scene.input.keyboard.createCursorKeys();
    }

    update(){
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

        if(cursors.up.isDown && player.body.blocked.down ){
            
            player.setVelocityY(-330);
        }
    }
}