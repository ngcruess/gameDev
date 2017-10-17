var demo = {}, spaceKey;
demo.state0 = function(){};
demo.state0.prototype= {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#B25F55';
        //game.stage.backgroundColor = '#3d7c48';        
        var titleText = game.add.text(game.world.width / 2, game.world.height / 2, 'The Kitchen', {fontsize: '128px', fill: '#FFFFFF', align: 'center'});
        updateAnchor(.5, .5, titleText);
        
        var subtitleText = game.add.text(game.world.width / 2, game.world.height / 2 + 32, 'Press Space to Continue', {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        
        updateAnchor(.5, .5, subtitleText);
        
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (spaceKey.isDown) {
            console.log('SPACE');
            game.state.start('state1');
        } 
    }
};