function GameMap(game){
	
	
	var map;
	var mapLayer;

	var marker;
	var currentTile = 0;

	var cursors;
	var showLayersKey;
	var mapLayerKey;
	
	this.init = function(){
	    //  Creates a blank tilemap
		map = game.add.tilemap('Level1');

		//  Add a Tileset image to the map
		map.addTilesetImage('ground_1x1','ground_1x1');

		mapLayer = map.createLayer('level');
		//  Resize the world
		mapLayer.resizeWorld();

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

		marker.x = mapLayer.getTileX(game.input.activePointer.worldX) * 32;
		marker.y = mapLayer.getTileY(game.input.activePointer.worldY) * 32;

		if (game.input.mousePointer.isDown)
		{
			map.putTile(currentTile, mapLayer.getTileX(marker.x), mapLayer.getTileY(marker.y), mapLayer);
			// map.fill(currentTile, mapLayer.getTileX(marker.x), mapLayer.getTileY(marker.y), 4, 4, mapLayer);
		}

	}
	
	this.createTileSelector = function() {

		//  Our tile selection window
		var tileSelector = game.add.group();

		var tileSelectorBackground = game.make.graphics();
		tileSelectorBackground.beginFill(0x000000, 0.5);
		tileSelectorBackground.drawRect(0, 0, 800, 34);
		tileSelectorBackground.endFill();

		tileSelector.add(tileSelectorBackground);

		var tileStrip = tileSelector.create(1, 1, 'ground_1x1');
		tileStrip.inputEnabled = true;
		tileStrip.events.onInputDown.add(this.pickTile, this);

		tileSelector.fixedToCamera = true;

		//  Our painting marker
		marker = game.add.graphics();
		marker.lineStyle(2, 0x000000, 1);
		marker.drawRect(0, 0, 32, 32);

	}
	
}