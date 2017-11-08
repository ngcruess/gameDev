var state2Music;

demo.state1b = function(){};
demo.state1b.prototype= {
    preload: function(){                
        game.load.audio('bossMusic', '../assets/audio/bossMusic.mp3');
    },
    create: function(){
        //game.stage.backgroundColor = '#B25F55';
        game.stage.backgroundColor = '#3d7c48';
        
        state2Music = game.sound.add('bossMusic');
        state2Music.allowMultiple = false;
        
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (spaceKey.isDown) {
            console.log('SPACE');
            game.state.start('state2');
            state2Music.play();
            state2Music.loopFull();
        } 
        state1Music.stop();
    }
};