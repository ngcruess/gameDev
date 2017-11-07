var game = new Phaser.Game(1500, 800, Phaser.AUTO);

//Variables to be used in many states
var mittens, cursor, jumps, platform, bullets, vbullets, fireRate = 200, shotTimer = 0, vfireRate = 200, vshotTimer = 0, 
    mittensFacingLeft = false, mittensJumpVelocity = 600, 
    mittensRunSpeed = 600, bulletSpeed = 1050, vbulletSpeed = 1050, yAxis = p2.vec2.fromValues(0, 1), globalGravity = 1200, jumps, death;

game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.start('state0');

/*
CORE FUNCTIONS
These are functions which will be reused in many states
*/

function moveMittens() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mittensFacingLeft = false;
            mittens.body.moveRight(mittensRunSpeed);
            mittens.animations.play('right');
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mittensFacingLeft = true;
            mittens.body.moveLeft(mittensRunSpeed);
            mittens.animations.play('left');
        }
        else{
            mittens.body.velocity.x = 0;
            mittens.animations.stop();
        }
        if (cursor.up.isDown) {
            if (mittens.flight) {
                mittens.body.moveUp(mittensJumpVelocity); 
            }
            else if (jumpRel) {                
                mittensJump();
                jumpRel = false;
                console.log(jumps);
            }
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
    music.stop();
    //bossMusic.stop();
    death.play();
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
            bullet.reset(mittens.x + 50, mittens.y);
            bullet.body.moveRight(bulletSpeed); 
        }
        gunShot.play(); 
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
    //jumps = 2;

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
    if (target === null) {
        bullet.destroy();
    }
    else{
        bullet = this;
        if (vbullets.children.indexOf(bullet) > -1) {
            if (target == mittens.body) {
                //This should do something other than killing mittens -- 
                //probably reset him to another state where the player can then enter 
                //the boss fight again 
                if (!mittens.invincible) {
                    mittens.kill();
                }
            }
            bullet.kill();
        }
        else if (target == vacuum.body) {
            bullet.kill();
            vacuum.health -= .005;
            //healthText = vacuum.health;
            if (vacuum.health <= 0){
                vacuum.kill()
            }
        }
        else if (target != mittens.body) {
            bullet.kill();
        }        
    }
}
function turretBulletHit(target) {
    turretBullet = this;
    if (target == null) {
        turretBullet.destroy();
    }
    else {
        if (turretBullets.children.indexOf(turretBullet) > -1) {
            if (target == mittens.body) {
                if (!mittens.invincible) {
                    mittens.kill();
                    game.state.start(game.state.current);
                }
            }
            turretBullet.kill();
        }        
    }
    turretBullet.kill()
}
function bulletHitMittens(target) {
    bullet = this;
    if (target == mittens.body) {
        bullet.kill();
        Mittens.health -= .1;
        //healthText = vacuum.health;
        if (mittens.health <= 0){
            mittens.kill()
        }
    }
    else if (target != mittens.body) {
        bullet.kill();
    }
}
function mittensHit(body, bodyB, shapeA, shapeB, equation) {
    if (body == null) {
        return
    }
    if (body.sprite.key == 'mouse') {
        if (!mittens.invincible) {
            killMittens();
            //mittens.reset(125, 500);
            //mittens.body.velocity.y = 0;
        }
    }
}