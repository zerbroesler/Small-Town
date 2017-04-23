function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;
	
	var checkSpriteEntersHouse = function(sprite){
		if(sprite.y === 200){
			sprite.data.enter=1;
		}
	}

	return function() {
		// Function called 60 times per second
		var aMoving = [];
		var graphics = model.getGraphics();
		graphics.clear();

		
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
			if(sprite.data.upwards !== true){
				sprite.y++;
			}else{
				sprite.y--;
			}
			if(!isNaN(sprite.data.enter)) {
				sprite.x += sprite.data.enter;
				if (sprite.x>490 || sprite.x<430){
					sprite.visible = false;
					model.removeSprite(sprite);
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
