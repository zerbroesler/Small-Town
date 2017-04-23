function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;
	
	var isMyColor = function(tile,color){
		if(Math.floor((tile.index-1)/40)==color){
			return true;
		}else{
			return false;
		}
	};
	
	var checkSpriteEntersHouse = function(sprite){
		var map = model.getGameMap().getMap();
		var left = map.getTile(13,Math.round(sprite.y/32));
		var right = map.getTile(16,Math.round(sprite.y/32));
		if(isMyColor(left,1)){
			sprite.data.enter=-1;
		}
		if(isMyColor(right,1)){
			sprite.data.enter=1;
		}
	}

	return function() {
		// Function called 60 times per second
		var aMoving = [];
		var graphics = model.getGraphics();
		graphics.clear();
		var map = model.getGameMap().getMap();

		
		// Find out where the mouse is
        var mx = game.input.activePointer.worldX;
        var my = game.input.activePointer.worldY;
		var oRectData = null;

		var userSelection = model.getSelection();
		
		userSelection.setColorSelectedFrame();
		
		// Sprite
		var sprites = model.getSprites();
		for (var spriteNo=0;spriteNo<sprites.length;spriteNo++){
			var sprite = sprites[spriteNo];
			if(!isNaN(sprite.data.enter)) {
				sprite.x += sprite.data.enter;
				var spriteY = Math.round(sprite.y/32);
				if (sprite.x>490 || sprite.x<430){
					sprite.visible = false;
					var mapLayer = model.getMapLayer();
					model.removeSprite(sprite);
					if(sprite.data.enter===-1){
						var left = map.getTile(13,spriteY);
						if(left.index%40<33){
							map.putTile(left.index+8,13,spriteY,mapLayer);
						}
					}

//						var right = map.getTile(16,spriteY));
				}
			}else{
				if(sprite.data.upwards !== true){
					sprite.y++;
				}else{
					sprite.y--;
				}
			}

			if(sprite.y < 10 && sprite.data.upwards === true) {
				sprite.data.upwards = false;
			}
			if(sprite.y > 600 && sprite.data.upwards !== true) {
				sprite.data.upwards = true;
			}
			checkSpriteEntersHouse(sprite);
		}
	};
	
	
}
