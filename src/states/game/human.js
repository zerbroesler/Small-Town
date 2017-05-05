function Human(game,model){
	// a human (citizen object)
	// includes the sprite object 
	var leftOfRoad = 8;
	var rightOfRoad = 11;
	var zoom = Math.sqrt(2);
	var middle = c.fieldsize.x / 2 - 16 + 4;
	
	var sprite = game.add.sprite(middle-2 + Math.floor(Math.random()*3) , -40, //x,y
								 'maennchen',                                // spritename
								 Math.floor(Math.random()*4));               // color
	sprite.alpha = 1;
	this.enter = 0;
	this.enterY = 0;
	this.angry = 0;
	this.color = sprite.frame + 1;
	this.upwards = false;
	this.merged = [];
	this.no = undefined;

	var unhappy = 0;
	var lifeTime = 0;

	var isMyColor = function(tile,color){
		if(tile === null){
			return false;
		}
		if(Math.floor((tile.index-1)/40)==color){
			return true;
		}else{
			return false;
		}
	};

	var setUnhappy = function(unhappyIn){
		sprite.frame = sprite.frame % 4 + unhappyIn * 4;
		unhappy = unhappyIn;
	};
	this.updateHappyness = function(){
		lifeTime++;
		if(lifeTime === 1000){
			setUnhappy(1);
		}
		if(lifeTime === 2000){
			setUnhappy(2);
		}
		if(lifeTime >= 2000){
			return true;
		}else{
			return false;
		}
	};

	this.checkEnteringHouse = function(){
		
		var enterOrSplit = function(side,tile){
			if(this.angry === 0){
				// Directly enter
				this.enter=side;
				this.enterY=sprite.y-roundY*32;
				this.enterId = model.addHouseEntered({x: tile.x, y: tile.y});
			}else{
				// Split when entering
				unmergedHumanNumber = this.merged.shift();
				var unmergedHuman = model.getMergedHuman(unmergedHumanNumber)[0];
				var unmergedSprite = unmergedHuman.getSprite();
				unmergedSprite.y = sprite.y;
				unmergedSprite.scale.x = 1;
				unmergedSprite.scale.y = 1;
				unmergedSprite.visible = true;
				unmergedHuman.enter = side;
				unmergedHuman.enterY=sprite.y-roundY*32;
				model.addHuman(unmergedHuman);
				this.unMonster();
				this.enterId = model.addHouseEntered({x: tile.x, y: tile.y});
			}
		};
		
		var enterHouseWhenFree = function(tile,side) {
			if(isMyColor(tile,this.color)){
				var houses = model.getHouses();
				if(model.isHouseEntered({x: tile.x, y: tile.y})===true){
					// Cannot enter a house which is currently entered
					return;
				}
				if(houses.getHousePlaces(tile.x,tile.y).freePlaces > 0){
					enterOrSplit.call(this,side,tile);
				}
			}
		};
		
		if(this.enter!==0){
			// Already entering
			return;
		}
		var map = model.getGameMap().getMap();
		var roundY = Math.round(sprite.y/32);
		var left = map.getTile(leftOfRoad,roundY);
		var right = map.getTile(rightOfRoad,roundY);
		enterHouseWhenFree.call(this,left,-1);
		enterHouseWhenFree.call(this,right,1);
	};
	
	this.movesToHouse = function(){
		sprite.x += this.enter;
		sprite.y -= this.enterY/16;
		var spriteY = Math.round(sprite.y/32);
		if (sprite.x>middle+25 || sprite.x<middle-25){
			sprite.visible = false;
			var x = 0;
			if(this.enter===-1){
				x = leftOfRoad;
			}
			if(this.enter===1){
				x = rightOfRoad;
			}
			var y = spriteY;
			//Put somebody in
			houses = model.getHouses();
			houses.enterHouse(x,y);
			this.x = x;
			this.y = y;
			model.removeHuman(this);
			model.removeHouseEntered(this.enterId);
			this.enterId=undefined;
		}
	};
	
	this.movesUpDown = function(){
		if(this.upwards !== true){
			sprite.y++;
		}else{
			sprite.y--;
		}
	};
	
	this.checkBounds = function(){
		if(sprite.y < 1 && this.upwards === true) {
			this.upwards = false;
		}
		var scale = sprite.scale.y;
		if(sprite.y >= c.fieldsize.y-(32 * scale) && this.upwards !== true) {
			this.upwards = true;
		}
	};
	
	this.move = function(){
		if(this.enter !== 0) {
			this.movesToHouse();
		}else{
			this.movesUpDown();			
		}
		this.checkBounds();

		this.checkEnteringHouse();		
	};
	this.getSprite = function(){
		return sprite;
	};

	this.unhappyCollision = function(human2){
		var sprite2 = human2.getSprite();
		if(this.no !== human2.no && 
				(sprite.y === sprite2.y || sprite.y+1 === sprite2.y) && 
				sprite.frame === sprite2.frame && 
				human2.enter === 0 && this.enter === 0){
			// Two unhappy met!
			this.makeMonster(human2);
			return true;
		}else{
			return false;
		}
	};
	
	this.invisible = function(){
		sprite.visible = false;
	};
	
	this.makeMonster = function(human2){
		// Add sizes of the two participants!!
		var oldScale = sprite.scale.x;
		var newScale = sprite.scale.x * human2.getSprite().scale.x * zoom;
		var rescaling = newScale - oldScale;
		
		game.add.tween(sprite.scale).to(
				{
					x: newScale,
					y: newScale,
				}, 1000, Phaser.Easing.Cubic.Out, true);
		var xMove = sprite.x - ( 16 * rescaling );
		game.add.tween(sprite).to({x : xMove},1000,Phaser.Easing.Cubic.Out,true);
		this.angry++;
		if(this.angry === 4){
			// Game over
			stateText = model.stateText;
			stateText.text=" GAME OVER ";
			stateText.alpha = 0.2;
			stateText.scale.x = 0.1;
			stateText.scale.y = 0.1;
			stateText.visible = true;
			stateText.x = middle;
			var gameOver = function(){
				exitButton = new LabelButton(game,middle,game.world.height-60,'button', 'Back', function() {
					game.paused = false;
					game.state.start("GameMenu");
				},this,1,0);
				exitButton.anchor.setTo(0.5);
				model.getGameMap().deactivate();
				game.paused = true;
			};
			game.add.tween(stateText.scale).to({x:1,y:1},1200,Phaser.Easing.Cubic.Out,true);
			game.add.tween(stateText).to({alpha:1},1200,Phaser.Easing.Cubic.Out,true).onComplete.add(gameOver,this);
		}
	};
	this.unMonster = function(){
		// Shrink!!
		var oldScale = sprite.scale.x;
		var newScale = sprite.scale.x / zoom;
		var rescaling = oldScale - newScale;
		game.add.tween(sprite.scale).to(
				{
					x: newScale,
					y: newScale,
				}, 1000, Phaser.Easing.Cubic.Out, true);
		var xMove = sprite.x + ( 16 * rescaling );
		game.add.tween(sprite).to({x : xMove},2000,Phaser.Easing.Cubic.Out,true);
		this.angry--;
	};

	
};