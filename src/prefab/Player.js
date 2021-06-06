
var canDoubleJump;
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
        this.load.audio('Jump', './assets/Jump.mp3');
    }
    update(){
        //Allows for player to go left or right and plays the animations for each direction.
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
        //Allows for double jump.
        const didPressJump = Phaser.Input.Keyboard.JustDown(cursors.up);
        if (didPressJump) {
            if (player.body.onFloor()) {
              // player can only double jump if it is on the floor
              this.canDoubleJump = true;
              player.body.setVelocityY(-250);
            } 
            else if (this.canDoubleJump) {
              // player can only jump 2x (double jump)
              this.canDoubleJump = false;
              player.body.setVelocityY(-250);
            }

            if (forward) {
                player.anims.play('jumpright');
            }else{
                player.anims.play('jumpleft');
            }
            
        }
        
        

    }
    startJump(){
        this.timer=this.time.addEvent({ delay: 100, callback: this.tick, callbackScope: this, loop: true});
    }
    endJump(){
        this.timer.remove();
        this.ball.setVelocityY(-this.power*50);
    }
    tick(){
        this.power += 1;
    }
}