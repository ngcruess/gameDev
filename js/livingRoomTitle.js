var livingRoomStartTimer;

demo.livingRoomTitle = function(){};
demo.livingRoomTitle.prototype= {
    preload: function(){
    },
    create: function(){
        game.stage.backgroundColor = '#B25F55';
        
        title = game.add.text(game.world.width / 2, game.world.height / 2, "The Living Room");
        updateAnchor(0.5, 0.5, title);
        
        livingRoomStartTimer = game.time.now;
    },
    update: function(){
        if (game.time.now > livingRoomStartTimer + 2000) {
            game.state.start('state1');
        }
    }
};