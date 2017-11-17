var state2StartTimer;

demo.state2Title = function(){};
demo.state2Title.prototype= {
    preload: function(){
    },
    create: function(){
        game.stage.backgroundColor = '#C3C3C3';
        
        title = game.add.text(game.world.width / 2, game.world.height / 2, "The Vacuum");
        updateAnchor(0.5, 0.5, title);
        
        state2StartTimer = game.time.now;
    },
    update: function(){
        if (game.time.now > state2StartTimer + 2000) {
            game.state.start('state2');
        }
    }
};