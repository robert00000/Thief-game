class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame){
        // call Phaser Physics Sprite constructor
        super(scene, x, y, key, frame);
        // setup Physics Sprite
        scene.add.existing(this);               // make it real
        scene.physics.add.existing(this);       // add physics body
        
        

        cursors = scene.input.keyboard.createCursorKeys();
    }
    preload(){
        this.load.audio('Footsteps', './assets/footsteps4.wav');
    }
    update(){
        
        if (cursors.left.isDown)
        {
            //this.sound.play('Footsteps');
            player.setVelocityX(-160);
            forward = false;
            if (player.body.blocked.down){
                player.anims.play('left', true);
            }
        }
        else if (cursors.right.isDown)
        {
            //this.sound.play('Footsteps');
            player.setVelocityX(160);
            forward = true;
            if (player.body.blocked.down){
                player.anims.play('right', true);
            }
        }   
        else{
            player.setVelocityX(0);
            if (forward) {
                player.anims.play('rightstill');
            }else{
                player.anims.play('leftstill');
            }
        }

        if(cursors.up.isDown && player.body.blocked.down ){
            
            player.setVelocityY(-330);
            if (forward) {
                player.anims.play('jumpright');
            }else{
                player.anims.play('jumpleft');
            }
        }
    }
}