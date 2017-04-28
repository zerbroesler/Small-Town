/**
 * 
 */
function Loader(game) {

	return function() {

		game.load.image('col1','pic/blue.png');
		game.load.image('col2','pic/green.png');
		game.load.image('col3','pic/yellow.png');
		game.load.image('col4','pic/purple.png');
		game.load.image('loadingBar','pic/loadingBar.png');
		

	    game.load.script('splash',  'states/Splash.js');
		
		// Load maps
		game.load.tilemap('Level1','maps/level1a.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.image('ground','pic/ground.png');
		
		
		// This sets a limit on the up-scale
		game.scale.maxWidth = c.sizeMax.x;
		game.scale.maxHeight = c.sizeMax.y;
		game.scale.minWidth = c.sizeMin.x;
		game.scale.minHeight = c.sizeMin.y;

		// Then we tell Phaser that we want it to scale up to whatever the
		// browser can handle, but to do it proportionally
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	};

}