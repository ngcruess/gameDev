demo.state1b = function(){};
demo.state1b.prototype= {
    preload: function(){
    },
    create: function(){
        //game.stage.backgroundColor = '#B25F55';
        game.stage.backgroundColor = '#3d7c48';
        
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (spaceKey.isDown) {
            console.log('SPACE');
            game.state.start('state2');
        } 
        state1Music.stop();
    }
};