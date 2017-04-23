function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;
	var wait = 200;
	var middle = c.fieldsize.x / 2 -16;
	var leftOfRoad = 8;
	var rightOfRoad = 11;
	
	var isMyColor = function(tile,color){
		if(Math.floor((tile.index-1)/40)==color){
			return true;
		}else{
			return false;
		}
	};
	
	var checkSpriteEntersHouse = function(sprite){
		var map = model.getGameMap().getMap();
		var roundY = Math.round(sprite.y/32);
		var left = map.getTile(leftOfRoad,roundY);
		var right = map.getTile(rightOfRoad,roundY);
		if(isMyColor(left,sprite.data.color)){
			sprite.data.enter=-1;
			sprite.data.entery=sprite.y-roundY*32;
		}
		if(isMyColor(right,sprite.data.color)){
			sprite.data.enter=1;
			sprite.data.entery=sprite.y-roundY*32;
		}
	}

	return function() {
		// Function called 60 times per second
		var aMoving = [];
		var graphics = model.getGraphics();
		graphics.clear();
		var map = model.getGameMap().getMap();

		wait--;
		if(model.getSprites().length<10 && wait < 0){
			sprite = game.add.sprite(middle-4 + Math.floor(Math.random()*8) , 0, 'maennchen',Math.floor(Math.random()*4));
			model.addSprite(sprite);
			wait = Math.floor(Math.random()*50)+100;
		}
		
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
				sprite.y -= sprite.data.entery/16;
				var spriteY = Math.round(sprite.y/32);
				if (sprite.x>middle+25 || sprite.x<middle-25){
					sprite.visible = false;
					var mapLayer = model.getMapLayer();
					model.removeSprite(sprite);
					if(sprite.data.enter===-1){
						var left = map.getTile(leftOfRoad,spriteY);
						if(left.index%40<33){
							map.putTile(left.index+8,leftOfRoad,spriteY,mapLayer);
						}
					}
					if(sprite.data.enter===1){
						var right = map.getTile(rightOfRoad,spriteY);
						if(right.index%40<33){
							//Put somebody in
							map.putTile(right.index+8,rightOfRoad,spriteY,mapLayer);
						}
					}
				}
			}else{
				if(sprite.data.upwards !== true){
					sprite.y++;
				}else{
					sprite.y--;
				}
			}

			if(sprite.y < 1 && sprite.data.upwards === true) {
				sprite.data.upwards = false;
			}
			if(sprite.y >= c.fieldsize.y-32 && sprite.data.upwards !== true) {
				sprite.data.upwards = true;
			}
			checkSpriteEntersHouse(sprite);
		}
	};
	
	
}
