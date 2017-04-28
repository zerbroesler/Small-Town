/*
 * Inits the game and starts the splash state which loads assets and calls the game 
 */
var game;
function init() {

	// Initialize Phaser, and creates a game
	game = new Phaser.Game(c.size.x, c.size.y, Phaser.AUTO, 'game_div',null,false,false);

	var preStart = {};
	preStart.preload = function(){
		game.load.image('loadingBar','pic/loadingBar.png');
	};
	preStart.create = function(){
		// This sets a limit on the up-scale
		game.scale.maxWidth = c.sizeMax.x;
		game.scale.maxHeight = c.sizeMax.y;
		game.scale.minWidth = c.sizeMin.x;
		game.scale.minHeight = c.sizeMin.y;
		// Then we tell Phaser that we want it to scale up to whatever the
		// browser can handle, but to do it proportionally
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Creates a new 'splash' state that will load assets and start the
		var splash = new Splash();	
		game.state.add('splash', splash);
		game.state.start('splash');
	};
	
	game.state.add('preStart', preStart);
	game.state.start('preStart');


}