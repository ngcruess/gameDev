var game = new Phaser.Game(900, 700, Phaser.AUTO);
game.state.add('state0', demo.state0);
game.state.add('state3', demo.state3);
game.state.add('state1', demo.state1);
game.state.start('state0');