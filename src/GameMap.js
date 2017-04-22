function GameMap(game){
	
	
	var map;
	var layer1;
	var layer2;
	var layer3;

	var marker;
	var currentTile = 0;
	var currentLayer;

	var cursors;
	var showLayersKey;
	var layer1Key;
	var layer2Key;
	var layer3Key;
	
	this.init = function(){
	    //  Creates a blank tilemap
		map = game.add.tilemap();

		//  Add a Tileset image to the map
		map.addTilesetImage('ground_1x1');

		//  Creates a new blank layer and sets the map dimensions.
		//  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
		layer1 = map.create('level1', 40, 30, 32, 32);
		layer1.scrollFactorX = 0.5;
		layer1.scrollFactorY = 0.5;

		//  Resize the world
		layer1.resizeWorld();

		layer2 = map.createBlankLayer('level2', 40, 30, 32, 32);
		layer2.scrollFactorX = 0.8;
		layer2.scrollFactorY = 0.8;

		layer3 = map.createBlankLayer('level3', 40, 30, 32, 32);

		currentLayer = layer3;

		//  Create our tile selector at the top of the screen
		this.createTileSelector();

		game.input.addMoveCallback(updateMarker, this);

		cursors = game.input.keyboard.createCursorKeys();

		showLayersKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		layer1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		layer2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		layer3Key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);		
		
	    showLayersKey.onDown.add(changeLayer, this);
		layer1Key.onDown.add(changeLayer, this);
		layer2Key.onDown.add(changeLayer, this);
		layer3Key.onDown.add(changeLayer, this);

		console.log(layer1.index);
		console.log(layer2.index);
		console.log(layer3.index);

	}
	
	this.pickTile = function(sprite, pointer) {
		currentTile = game.math.snapToFloor(pointer.x, 32) / 32;
	}
	
	this.updateMarker = function() {

		marker.x = currentLayer.getTileX(game.input.activePointer.worldX) * 32;
		marker.y = currentLayer.getTileY(game.input.activePointer.worldY) * 32;

		if (game.input.mousePointer.isDown)
		{
			map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
			// map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4, currentLayer);
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
		tileStrip.events.onInputDown.add(pickTile, this);

		tileSelector.fixedToCamera = true;

		//  Our painting marker
		marker = game.add.graphics();
		marker.lineStyle(2, 0x000000, 1);
		marker.drawRect(0, 0, 32, 32);

	}
	
}