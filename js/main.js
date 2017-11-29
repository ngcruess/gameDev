var game = new Phaser.Game(1500, 800, Phaser.AUTO);

//Variables to be used in many states
var mittens, cursor, jumps, platform, bullets, vbullets, fireRate = 200, shotTimer = 0, vfireRate = 200, vshotTimer = 0, 
    mittensFacingLeft = false, mittensJumpVelocity = 600, 
    mittensRunSpeed = 400, bulletSpeed = 700, vbulletSpeed = 700, yAxis = p2.vec2.fromValues(0, 1), globalGravity = 1200, jumps = 2, jumpRel = true, death, state1Deaths = -1, state1Section = 0, currentState, deathTime;

game.state.add('death', demo.death);
game.state.add('state0', demo.state0);
game.state.add('intro', demo.intro);
game.state.add('livingRoomTitle', demo.livingRoomTitle);
game.state.add('state1', demo.state1);
game.state.add('state1b', demo.state1b);
game.state.add('state2Title', demo.state2Title);
game.state.add('state2', demo.state2);
game.state.add('sandbox', demo.sandbox);
game.state.start('state0');

/*
CORE FUNCTIONS
These are functions which will be reused in many states
*/
function moveMittens() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)){
            mittensFacingLeft = false;
            mittens.body.moveRight(mittensRunSpeed);
            mittens.animations.play('right');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)){
        mittensFacingLeft = true;
        mittens.body.moveLeft(mittensRunSpeed);
        mittens.animations.play('left');
    }
    else{
        mittens.body.velocity.x = 0;
        mittens.animations.stop();
    }
    if (cursor.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        //console.log('W or UP\n' + jumpRel);
        if (mittens.flight) {
            mittens.body.moveUp(mittensJumpVelocity); 
        }
        else if (jumpRel) {                
            mittensJump();
            jumpRel = false;
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
function killMittens(mittens) {
    //console.log('in killMittens');
    goto = game.state.current;
    //console.log(goto);
    deathTime = game.time.now;
    game.state.start('death');
    //music.stop();
    //bossMusic.stop();
    //death.play();
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
        //gunShot.play(); 
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
    else if (jumps == 1  && game.time.now > jumpTime + 200 && game.time.now < jumpTime+700) {
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
    if (target == null) {
        bullet.destroy();
    }
    else{
        bullet = this;
        if (vbullets != null && vbullets.children.indexOf(bullet) > -1) {
            if (target == mittens.body) {
                //This should do something other than killing mittens -- 
                //probably reset him to another state where the player can then enter 
                //the boss fight again 
                if (!mittens.invincible) {
                    killMittens();
                }
                bullet.kill();
            }
            else if (bullets.children.indexOf(target) > -1) { 
                target.kill();
            }
            else {
                bullet.kill();
                
            }
        }
        else if (vacuum != null && target == vacuum.body) {
            bullet.kill();
            vacuum.health -= .005;
            //healthText = vacuum.health;
            if (vacuum.health <= 0){
                vacuum.kill()
            }
        }
        //For targets in state1b shooting tutorial
        else if (targets != undefined && targets.children.indexOf(target.sprite) > -1) {
            target.sprite.kill();
            bullet.kill();
            targetsKilled ++;
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
                    killMittens();
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
    if (body.sprite.key == 'mouse' || body.sprite.key == 'orb') {
        if (!mittens.invincible) {
            killMittens();
            //mittens.reset(125, 500);
            //mittens.body.velocity.y = 0;
        }
    }
}
function up(){
    console.log('button up', arguments);
}
function over(){
    console.log('button over');
}
function out(){
    console.log('button out');
}
function down(){
    console.log('button down');
}
function updateTimer() {
    minutes = Math.floor(game.time.now/60000)% 60;
    seconds = Math.floor(game.time.now/1000) % 60;
    milliseconds = Math.floor(game.time.now) % 100;
    
    if (milliseconds < 10) { milliseconds = "0" + milliseconds};
    if (seconds < 10) { seconds = '0' + seconds};
    if (minutes < 10) { minutes = '0' + minutes};
    timer.setText(minutes + ":" + seconds + ":" + milliseconds);    
}
function moveMice() {
    for (var i = 0, len = mice.children.length; i < len; i++) {
        var mouse = mice.children[i];
        if (mouse.id == 3 || mouse.id == 6) {
            var y = mouse.y;
            mouse.body.velocity.x = 0;
            if (bottomTouching(mouse)) {
                mouse.body.moveUp(1000);
            }
            if (Math.abs(mouse.x - mouse.leftXLim) > 20) {
                mouse.reset(mouse.leftXLim, mouse.y);
            }
        }
        else if (mouse.id != 8) {
            if (mouse.movingRight && mouse.x < mouse.rightXLim) {
                mouse.body.moveRight(mouse.speed);
            }
            else if (mouse.x > mouse.leftXLim) {
                mouse.body.moveLeft(mouse.speed);
            }
            if (mouse.x >= mouse.rightXLim) {
                mouse.movingRight = false;
                mouse.frame = 0;
            }
            else if (mouse.x <= mouse.leftXLim) {
                mouse.movingRight = true;
                mouse.frame = 4;
            }
            if (mouse.x > mouse.rightXLim + 30 || mouse.x < mouse.leftXLim - 10 || mouse.y < mouse.yLim - 10 || mouse.y > mouse.yLim + 10) {
                mouse.reset(mouse.leftXLim, mouse.yLim);
            }
        }
        else {
            if (mittens.x > 4950) {
                mouse.body.moveLeft(mouse.speed);
            }
        }
    }
}
function turretShoot() {
    var turretBullet;
    for (var i = 0, len = turrets.children.length; i < len; i++){
        var turret = turrets.children[i];
        if (game.time.now - turret.lastShot >= turret.shotDelay) {
            turret.nextShot += turret.shotDelay;
            turret.lastShot = game.time.now;
            if (turret.shootL) {
                turretBullet = turretBullets.getFirstExists(false);
                game.physics.p2.enable(turretBullet, false);
                turretBullet.body.data.gravityScale = 0;
                turretBullet.body.mass = 1;
                turretBullet.body.onBeginContact.add(turretBulletHit, turretBullet);
                turretBullet.reset(turret.x - 25, turret.y - 12); 
                turretBullet.body.moveLeft(700);            
            }  

            if (turret.shootR) {
                turretBullet = turretBullets.getFirstExists(false);
                game.physics.p2.enable(turretBullet, false);
                turretBullet.body.data.gravityScale = 0;
                turretBullet.body.mass = 1;
                turretBullet.body.onBeginContact.add(turretBulletHit, turretBullet);
                turretBullet.reset(turret.x + 50, turret.y - 12); 
                turretBullet.body.moveRight(700);             
            }
            if (turret.shootU) {
                turretBullet = turretBullets.getFirstExists(false);
                game.physics.p2.enable(turretBullet, false);
                turretBullet.body.data.gravityScale = 0;
                turretBullet.body.mass = 1;
                turretBullet.body.onBeginContact.add(turretBulletHit, turretBullet);
                turretBullet.reset(turret.x, turret.y - 40); 
                turretBullet.body.moveUp(700);             
            }
        }
    }
}