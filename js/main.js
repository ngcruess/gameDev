var game = new Phaser.Game(1000, 800, Phaser.AUTO);

//Variables to be used in many states
var mittens, cursor, jumps, platform, bullets, fireRate = 200, shotTimer = 0, 
    mittensFacingLeft = false, mittensJumpVelocity = 600, 
    mittensRunSpeed = 400, bulletSpeed = 700, yAxis = p2.vec2.fromValues(0, 1), globalGravity = 1200, jumps;

game.state.add('state0', demo.state0);
game.state.add('state0a', demo.state0a);
game.state.add('state3', demo.state3);
game.state.start('state0a');
//game.state.start('state3');

/*
CORE FUNCTIONS
These are functions which will be reused in many states
*/

function moveMittens() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mittensFacingLeft = false;
            mittens.body.moveRight(mittensRunSpeed);
            mittens.scale.setTo(1, 1);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mittensFacingLeft = true;
            mittens.body.moveLeft(mittensRunSpeed);
            mittens.scale.setTo(-1, 1);
        }
        else{
            mittens.body.velocity.x = 0;
            mittens.animations.stop();
        }
        if (cursor.up.isDown && jumpRel) {
            mittensJump();
            jumpRel = false;
            console.log(jumps);
        }
}


function attack() {
    if (game.time.now > attackTime) {
        attacking = true;
        attackTime = game.time.now + 125;
        if (mittensFacingLeft) {
            mittens.animations.play('attackLeft');
        }
        else {
            mittens.animations.play('attackRight');
        }
    }
}
function updateAnchor(x, y, item) {
    item.anchor.x = x;
    item.anchor.y = y;
}
function fight(mittens, mouse) {
    if (attacking) {
        mouse.kill();
        miceKilled += 1;
    }
    else {
        miceKilled = 0;
        game.state.start('state1');
    }
}
function killMittens(mittens) {
    miceKilled = 0;
    game.state.start('state1');
}
function mittensShoot() {
    if (game.time.now >= shotTimer) {
        shotTimer = game.time.now + 200;
        var bullet = bullets.getFirstExists(false);
        bullet.body.data.gravityScale = 0;
        bullet.scale.setTo(0.33, 0.33);
        bullet.body.mass = 1;
        
        if (mittensFacingLeft) {
            bullet.reset(mittens.x - 50, mittens.y);
            bullet.body.moveLeft(bulletSpeed);
        }
        else {
            bullet.reset(mittens.x + 30, mittens.y);
            bullet.body.moveRight(bulletSpeed);
        }
    }
}
// ADDED DOUBLE JUMP
function mittensJump() {
    
    if (bottomTouching(mittens)) {
        jumps = 2;
        mittens.body.moveUp(mittensJumpVelocity);
        jumpTime = game.time.now
        jumps --;        
    }
    else if (jumps > 0 && game.time.now > jumpTime + 200 && game.time.now < jumpTime+700) {
        mittens.body.moveUp(mittensJumpVelocity);
        jumps = jumps -1;
    }
    else if (jumps >0){
        mittens.body.moveUp(mittensJumpVelocity);
        jumps = 0;
    }
}
function bottomTouching(character) {
    var result = false;

    for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === character.body.data || c.bodyB === character.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis);

            if (c.bodyA === character.body.data)
            {
                d *= -1;
            }

            if (d > 0.5)
            {
                result = true;
            }
        }
    }
    
    return result;
}
function bulletHit(target) {
    bullet = this;
    if (target == vacuum.body) {
        bullet.kill();
        vacuum.health -= 5;
        //healthText = vacuum.health; 
        if (vacuum.health == 0){
            vacuum.kill()
        }
    }
    else if (target != mittens.body) {
        bullet.kill();
    }
}