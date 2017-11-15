var vacuum, jumpRel, timer, healthText, healthBarWidth = 29.6, healthBarFill, bossMusic, vacTimer, stage = 1, vacBulletPos = 200, aoeTime, aoeSide;

demo.state2 = function() {};
demo.state2.prototype = {
    preload: function(){
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        game.load.image('platform', '../assets/images/block.png');
        game.load.image('shot', '../assets/images/projectile.png'); game.load.image('mShot','../assets/images/mouseprojectile.png');
        game.load.image('sShot','../assets/images/sockprojectile.png');
        game.load.image('lShot','../assets/images/legoprojectile.png');
        game.load.image('vacuum', '../assets/sprites/Vacuum.png');
        game.load.image('background', '../assets/images/brick.png');
        game.load.image('healthBarFill', '../assets/images/whiteBlock.png');
        game.load.image('healthBarBorder', '../assets/images/blackBlock.png');
        game.load.image('deathSquare', '../assets/images/death.png');
        
        game.load.spritesheet('mittensSheet', '../assets/spritesheets/BatCat.png', 100, 80);
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        
        game.load.audio('gun', '../assets/audio/gun.wav');
    },
    create: function(){
        //Physics settings
        game.physics.startSystem(Phaser.Physics.P2JS);                
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        game.world.setBounds(0, 0, 1500, 1200);
        
        //bossMusic = game.add.audio('bossMusic');
        //bossMusic.play();
        
        gunShot = game.add.audio('gun');
        
        //Input feedback
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode)
            if (e.keyCode == 38 || e.keyCode == 87){
                jumpRel = true;
            }            
        }
        //World items
        var background = game.add.sprite(0,0, 'background');
        background.scale.setTo(10, 10);
        
        // left side platforms
        platform = game.add.sprite(300, 200, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(200, 425, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(300, 650, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        // right side platforms
        platform = game.add.sprite(1200, 200, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1300, 425, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1200, 650, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        // center platform
        platform = game.add.sprite(700, 750, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        healthBarBorder = game.add.sprite(20, 20, 'healthBarBorder');
        healthBarBorder.scale.setTo(30, 3);
        healthBarBorder.fixedToCamera = true;
        healthBarFill = game.add.sprite(25, 24, 'healthBarFill');
        healthBarFill.scale.setTo(healthBarWidth, 2);
        healthBarFill.fixedToCamera = true;
        
        //  STAGE 2 SPRITES //
        leftSquare = game.add.sprite(0,0, 'deathSquare');
        leftSquare.alpha = 0;
        
        rightSquare = game.add.sprite(750, 0, 'deathSquare');
        rightSquare.alpha = 0;
        
        /*
        SPRITES
        */
        //Mittens
        mittens = game.add.sprite(153,354,'mittens2');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.fixedRotation = true;
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysics', 'ShootingMouth-2', 1, -Math.PI * 2);
        mittens.animations.add('left', [0,1,2], 10, true);
        mittens.animations.add('right', [3,4,5], 10, true);
        mittens.frame = 3;
        mittens.health = 100;        
        mittens.invincible = false;
        mittens.flight = false;
        
        game.camera.follow(mittens);
        game.camera.bounds = new Phaser.Rectangle(0, 0, 1500, 800);
       
        //Vacuum
        vacuum = game.add.sprite(700,400,'vacuum');
        vacuum.anchor.x = 0.5;
        vacuum.anchor.y = 0.5;  
        game.physics.p2.enable(vacuum); 
        vacuum.body.data.gravityScale = 0;
        vacuum.body.static = true;
        vacuum.health = 1;
        vacuum.leftXLim = 600;
        vacuum.rightXLim = 800;
        vacuum.upLim = 100;
        vacuum.botLim = 600;
        vacuum.speed = 150;
        vacuum.movingDown = true;
        
        //Bullets        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.P2JS;
        bullets.createMultiple(100, 'shot', false);
        bullets.setAll('owner', 'm');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        bullets.forEach(function(bullet) {
            bullet.body.onBeginContact.add(bulletHit, bullet);
        })
        //Input tools        
        cursor = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  
        
        //Vacuum Bullets        
        vbullets = game.add.group();
        vbullets.enableBody = true;
        vbullets.physicsBodyType = Phaser.Physics.P2JS;
        vbullets.createMultiple(200, 'shot', false);
        vbullets.setAll('owner', 'v');
        vbullets.setAll('anchor.x', 0.5);
        vbullets.setAll('anchor.y', 0.5);
        vbullets.setAll('outOfBoundsKill', true);
        vbullets.setAll('checkWorldBounds', true);
        vbullets.forEach(function(vbullet) {
            vbullet.body.onBeginContact.add(bulletHit, vbullet);
        })
       
        //come back to this...
        //create timer to initiate movement every 4 secs
//        timer = game.time.create(false);
//        timer.loop(4000, vacuumMovement, this);
//        timer.start();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        //Materials
        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', mittens.body);
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        
        //healthText = game.add.text(16, 16, 'health: 100', { fontSize: '32px', fill: '#000' });
        
        game.time.events.repeat(Phaser.Timer.SECOND *2, 1000, vacShoot, this);
    },
    update: function(){
        moveMittens();
        moveVacuum();
        
        if (bottomTouching(mittens)) {
            jumps = 2;
        }
        //healthText.text = 'Health: ' + vacuum.health;
        healthBarFill.scale.setTo(healthBarWidth * vacuum.health, 2)
        if (shootButton.isDown) {
            mittensShoot();            
        }
        if (vacuum.health > 0) {
            vbullets.forEachAlive(moveBullets, this);            
        }
        if (vacuum.health <= 0.67 && stage === 1){
            stage2Transition();
        }
        if (mittens.y > 1000) {
            killMittens();
        }
        if (stage === 2) {
            //console.log('aoeSide: ' + aoeSide);
            //console.log('aoeTime: ' + aoeTime);
            //console.log(game.time.now);
            if (aoeSide === 'left' && game.time.now > aoeTime + 7500) {
                if (mittens.x <= 750) {
                    killMittens();
                    stage = 1;
                }
                else {
                    aoeDeath('right');
                }
            }
            if (aoeSide === 'right' && game.time.now > aoeTime + 7500) {
                if (mittens.x >= 750) {
                    killMittens();
                    stage = 1;
                }
                else {
                    aoeDeath('left');
                }
            }
        }
        if (vacuum.health == 0){
            game.state.start('state0');
        }
    }
};

function mittensHit(body, bodyB, shapeA, shapeB, equation) {
    if (body == null) {
        return
    }
    if (body.sprite.key == 'platform') {
        mittens.reset(0,0);
    }
    mittens.health -= 10; 
}

// VACUUM MECHANICS
function moveVacuum(){
    if (vacuum.movingDown && vacuum.y < vacuum.botLim) {
                vacuum.body.moveDown(vacuum.speed);
            }
            else if (vacuum.y > vacuum.upLim) {
                vacuum.body.moveUp(vacuum.speed);
            }
            if (vacuum.y >= vacuum.botLim) {
                vacuum.movingDown = false;
                //vacuum.frame = 0;
            }
            else if (vacuum.y <= vacuum.upLim) {
                vacuum.movingDown = true;
                //vacuum.frame = 4;
            }
            if (vacuum.y > vacuum.botLim + 10 || vacuum.y < vacuum.topLim - 10 || vacuum.y < vacuum.botLim - 800 || vacuum.y > vacuum.yLim + 800) {
                vacuum.reset(vacuum.botLim, vacuum.upLim);
            }
    
    if (mittens.x > 750) {
        vacuum.scale.setTo(-1, 1);
        vacBulletPos = -200;
    } else if (mittens.x <750) {
        vacuum.scale.setTo(1, 1);
        vacBulletPos = 200;
    }
}

// VACUUM BULLETS //
function vacShoot() {
    if (game.time.now >= vshotTimer && vacuum.health > 0) {
        //vshotTimer = game.time.now + 200;
        var vbullet = vbullets.getFirstExists(false);
        vbullet.body.data.gravityScale = 0;
        vbullet.scale.setTo(0.5, 0.5);
        vbullet.body.mass = 1;
        vbullet.body.moveLeft(vbulletSpeed);
        
        vbullet.reset(vacuum.x-vacBulletPos, vacuum.y);        
    }
}

function moveBullets(bullet) {
    accelerateToObject(bullet, mittens, 500);    
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.force.y = Math.sin(angle) * speed;
}


// STAGE 2 ///
function stage2Transition() {
    console.log('stage2begins');
    stage = 2;
    if (mittens.x < 750) {
        aoeDeath('left');
    }
    else {
        aoeDeath('right');
    }
    
}

function aoeDeath(side) {
    aoeTime = game.time.now;
    aoeSide = side;
    if (aoeSide === 'left') {
        rightSquare.alpha = 0;
        leftSquare.alpha = 0.5;
    }
    else if (aoeSide === 'right') {
        leftSquare.alpha = 0;
        rightSquare.alpha = 0.5;
    }
    
}



