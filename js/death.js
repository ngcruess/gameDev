demo.death = function(){};
demo.death.prototype= {
    preload: function(){
    },
    create: function(){
        game.stage.backgroundColor = '#BBBBBB';
        
        //title = game.add.text(game.world.width / 2, 400, "You died.");
        //updateAnchor(0.5, 0.5, title);
    },
    update: function(){
        if (game.time.now > deathTime + 1500) {
            game.state.start(currentState);
        }
    }
};