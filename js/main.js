var game = new Phaser.Game(800, 600, Phaser.AUTO);
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