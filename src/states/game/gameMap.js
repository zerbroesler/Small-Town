function GameMap(game,model){
	
	
	var map;
	var mapLayer;

	var marker;
	var currentTile = 0;

	var cursors;
	var showLayersKey;
	var mapLayerKey;
	
	this.getMap = function(){
		return map;
	};
	
	this.init = function(){
	    //  Creates a blank tilemap
		map = game.add.tilemap('level_01');

		//  Add a Tileset image to the map
		map.addTilesetImage('ground','ground');

		mapLayer = map.createLayer('level');
		//  Resize the world
		mapLayer.resizeWorld();
		model.setMapLayer(mapLayer);

		//  Create our tile selector at the top of the screen
		this.createTileSelector();

		game.input.addMoveCallback(this.updateMarker, this);

		cursors = game.input.keyboard.createCursorKeys();

		showLayersKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		mapLayerKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		
		console.log(mapLayer.index);
	}
	
	this.pickTile = function(sprite, pointer) {
		currentTile = game.math.snapToFloor(pointer.x, 32) / 32;
	}
	
	this.updateMarker = function() {

		var tileX = mapLayer.getTileX(game.input.activePointer.worldX);
		var tileY = mapLayer.getTileY(game.input.activePointer.worldY);
		if(tileX>=c.grid.x || tileY>=c.grid.y){
			return;
		}
		marker.x = tileX * 32;
		marker.y = tileY * 32;

		if (game.input.mousePointer.isDown)
		{
			model.getHouses().setHouse(tileX,tileY,model.getColor());
		}

	}
	
	this.createTileSelector = function() {

		//  Our painting marker
		marker = game.add.graphics();
		marker.lineStyle(2, 0x000000, 1);
		marker.drawRect(0, 0, 32, 32);

	}
	
}