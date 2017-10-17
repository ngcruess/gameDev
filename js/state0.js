var demo = {}, spaceKey;
demo.state0 = function(){};
demo.state0.prototype= {
    preload: function(){
        game.load.image('mittens','../assets/sprites/BatCat.png');
    },
    create: function(){
        //game.stage.backgroundColor = '#B25F55';
        game.stage.backgroundColor = '#3d7c48';        
        var titleText = game.add.text(game.world.width / 2, 30, {fontsize: '256px', fill: '#FFFFFF', align: 'center'});     
        updateAnchor(0.5, 0.5, titleText)
        var subtitleText1 = game.add.text(30, 70, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var subtitleText2 = game.add.text(30, 110, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var subtitleText3 = game.add.text(30, 180, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var subtitleText4 = game.add.text(30, 250, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var actionPrompt = game.add.text(game.world.width /2 , game.world.height - 100, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        updateAnchor(0.5, 0.5, actionPrompt);
        
        titleText.text = "That Cat Mittens";
        subtitleText1.text = "You are Mittens, the mischievously imaginative warrior cat. ";
        subtitleText2.text = "Use the arrow keys to navigate the house. Press the up arrow to jump, \nand again to jump once while in the air."
        subtitleText3.text = "Press space to attack, but be careful! Some enemies are too powerful \nto be destroyed."
        subtitleText4.text = "Always remember: the floor is lava!"
        actionPrompt.text = "[Press SPACE to continue]"
        
        var mittens = game.add.sprite(game.world.width / 2, game.world.height /2, 'mittens');
        updateAnchor(0.5, 0.5, mittens);
        mittens.scale.setTo(1.25, 1.25);
        
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (spaceKey.isDown) {
            console.log('SPACE');
            game.state.start('state1');
        } 
    }
};