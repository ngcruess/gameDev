demo.death = function(){};
demo.death.prototype= {
    preload: function(){
    },
    create: function(){
        game.stage.backgroundColor = '#FFFFFF';
        
        title = game.add.text(game.world.width / 2, game.world.height / 2, "You died.");
        updateAnchor(0.5, 0.5, title);
    },
    update: function(){
        if (game.time.now > livingRoomStartTimer + 2000) {
            game.state.start('state1');
        }
    }
};