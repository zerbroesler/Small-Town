/**
 * 
 */
function Loader(game) {

	return function() {

		game.load.image('col1','pic/blue.png');
		game.load.image('col2','pic/green.png');
		game.load.image('col3','pic/yellow.png');
		game.load.image('col4','pic/purple.png');
		
		game.load.spritesheet('maennchen','pic/maennchen.png',32,32,4);
	
/*		
		game.load.image('horizontal','sprite/brushHozizontal.png');
		game.load.image('vertical','sprite/brushVertical.png');
		game.load.image('circle','sprite/circle.png');
		game.load.image('tri1','sprite/tri1.png');
		game.load.image('tri2','sprite/tri2.png');
		game.load.image('tri3','sprite/tri3.png');
		game.load.image('tri4','sprite/tri4.png');
		game.load.image('reset','sprite/reset.png');
		game.load.image('wonGame','sprite/wonGame.png');

		game.load.image('nextLevel','sprite/nextLevel.png');
*/
		// Load maps
		game.load.tilemap('Level1','maps/level1.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.image('ground_1x1','pic/ground_1x1.png');
		
		
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