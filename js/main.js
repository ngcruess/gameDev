var game = new Phaser.Game(1000, 800, Phaser.AUTO);

//Variables to be used in many states
var mittens, cursor, jumps, platform, bullets, fireRate = 200, shotTimer = 0, 
    mittensFacingLeft = true, mittensJumpVelocity = 800, 
    mittensRunSpeed = 400, bulletSpeed = 700, yAxis = p2.vec2.fromValues(0, 1);

game.state.add('state0', demo.state0);
game.state.add('state0a', demo.state0a);
game.state.add('state3', demo.state3);
game.state.add('state1', demo.state1);
game.state.start('state0a');

/*
CORE FUNCTIONS
These are functions which will be reused in many states
*/
function attack() {
    if (game.time.now > attackTime) {
        attacking = true;
        attackTime = game.time.now + 125;
        if (facing == 'LEFT') {
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
            bullet.reset(mittens.x - 30, mittens.y);
            bullet.body.moveLeft(bulletSpeed);
        }
        else {
            bullet.reset(mittens.x + 30, mittens.y);
            bullet.body.moveRight(bulletSpeed);
        }
    }
}
function mittensJump() {
    if (bottomTouching(mittens)) {
        mittens.body.moveUp(mittensJumpVelocity);
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