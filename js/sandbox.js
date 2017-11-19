var mittens;

demo.sandbox = function() {};
demo.sandbox.prototype = {
    preload: function() {
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
    },
    create: function() {
        
                    // P2 PHYSICS AND ENVIRONMENT //
        ////////////////////////////////////////////////////
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.world.setBounds(0, 0, 6000, 800);
        game.stage.backgroundColor = '#CCCCCC';
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        timer = game.add.text(1375,0, "00:00:00");
        timer.fixedToCamera = true;
        ////////////////////////////////////////////////////
        
        
                            // KEYBOARD //
        ////////////////////////////////////////////////////
        // CALLBACK FOR DOUBLE JUMP
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode)
            if (e.keyCode == 38 || e.keyCode == 87){
                jumpRel = true;
            } 
        }  
        
        cursor = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        ////////////////////////////////////////////////////
        
        
                        // MITTENS //
        ///////////////////////////////////////////////////
        mittens = game.add.sprite(100, 100, 'mittens2');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysics', 'ShootingMouth-2', 1, -Math.PI * 2);
        mittens.frame = 3;
        mittens.body.fixedRotation = true;
        mittens.animations.add('left', [0,1,2], 10, true);
        mittens.animations.add('right', [3,4,5], 10, true);
        mittens.invincible = false;
        mittens.flight = false;
        
        game.camera.follow(mittens);
        mittens.body.onBeginContact.add(mittensHit);
        ///////////////////////////////////////////////////
    },
    update: function() { 
        //console.log(mittens.x, mittens.y)
        moveMittens();
        updateTimer();
        if (bottomTouching(mittens)) {
            jumps = 2;
        }
    }
};
function updateTimer() {
    minutes = Math.floor(game.time.now/60000)% 60;
    seconds = Math.floor(game.time.now/1000) % 60;
    milliseconds = Math.floor(game.time.now) % 100;
    
    if (milliseconds < 10) { milliseconds = "0" + milliseconds};
    if (seconds < 10) { seconds = '0' + seconds};
    if (minutes < 10) { minutes = '0' + minutes};
    timer.setText(minutes + ":" + seconds + ":" + milliseconds);    
}









