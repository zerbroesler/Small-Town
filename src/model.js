function Model() {

	var that = this;
	var lines = [];
	var aShape = [];
	var aRects = [];
	var aMoving = [];
	var oBrush = null;
	var oGraphics = null;
	var gameMap = null;
	var level = 0;
	var color = 1;
	var marker = null;
	var selection = null;
	var houses = new Houses(this);
	var mapLayer = null;
	var sprites = [];
	var spritesHome = [];
	var spriteNo = 0;
	var score = 0;
	
	// Model
	this.getHouses = function(){
		return houses;
	}
	this.setColor = function(colorIn){
		color = colorIn;
	};
	this.getColor = function(){
		return color;
	};
	this.setMapLayer = function(mapLayerIn){
		mapLayer = mapLayerIn;
	};
	this.getMapLayer = function(){
		return mapLayer;
	};
	this.setMarker = function(markerIn){
		marker = markerIn;
	};
	this.getMarker = function(){
		return marker;
	};
	this.setSelection = function(selectionIn){
		selection = selectionIn;
	};
	this.getSelection = function(){
		return selection;
	};
	
	
	this.setGameMap = function(gameMapIn){
		gameMap = gameMapIn;
	};
	this.getGameMap = function(){
		return gameMap;
	};
	this.setGraphics = function(oGraphicsIn){
		oGraphics = oGraphicsIn;
	};
	this.getGraphics = function(){
		return oGraphics;
	};
	this.getLevel = function(){
		return level;
	};
	this.setLevel = function(iLevelIn){
		level = iLevelIn;
	};
	this.nextLevel = function(){
		this.createStartShape();
		this.setRects(this.createRects());
		level++;
		this.setGoal();
	};
	this.resetLevel = function(){
		this.createStartShape();
		this.setRects(this.createRects());
		this.setGoal();
	};
	this.addSprite = function(sprite){
		sprite.data.no = spriteNo;
		sprite.data.color = sprite.frame + 1;
		sprite.data.enter = 0;
		sprite.data.counter = 0;
		spriteNo++;
		sprites.push(sprite);
	}
	this.removeSprite = function(sprite){
		spritesHome.push(sprite);
		sprites = sprites.filter(function(current){
			return (current.data.no !== sprite.data.no)
		});
	}
	this.mergeSprite = function(sprite,sprite2){
		sprite2.visible = false;
		sprite.data.merged = sprite2.data.no;
		sprites = sprites.filter(function(current){
			return (current.data.no !== sprite2.data.no)
		});
	}
	this.getSprites = function(){
		return sprites;
	}
	this.addScore = function(value){
		score += value;
	};
	this.getScore = function(){
		return score;
	};
	this.setScoreText = function(scoreTextIn){
		scoreText = scoreTextIn;
	};
	
	this.scoring = function(){

		var that = this;
		
		spritesHome.forEach(function(sprite){
			sprite.data.counter++;
			if(sprite.data.counter % 50 === 0){
				var value = 100/houses.getHousePlaces(sprite.data.x,sprite.data.y).totalPlaces;
				that.addScore(value);
			}
			
		});
		scoreText.text = ""+(Math.floor(score));
	}
	
	this.spriteBehaviour = function(){
		var that = this;
		var unhappy = [];
		
		sprites.forEach(function(sprite){
			sprite.data.counter++;
			if(sprite.data.counter === 100){
				sprite.frame = sprite.frame+4;
			}
			if(sprite.data.counter === 200){
				sprite.frame = sprite.frame+4;
			}
			if(sprite.frame >=8){
				unhappy.push(sprite);
			}
		});
		for(var i=0;i<unhappy.length-1;i++){
		sprite = unhappy[i];
			for(var j=i;j<unhappy.length;j++){
				sprite2 = unhappy[j];
				if(sprite.data.no!==sprite2.data.no && (sprite.y === sprite2.y || sprite.y+1 === sprite2.y) && sprite.frame === sprite2.frame){
					// Two unhappy met!
					that.mergeSprite(sprite,sprite2);
					sprite.scale.setTo(sprite.scale.x*1.5,sprite.scale.y*1.5);
					sprite.x -=4*sprite.scale.y;
					if(sprite.scale.x>3){
						// Game over
					stateText.text=" GAME OVER \n Click to restart";
					stateText.visible = true;

					//the "click to restart" handler
					game.input.onTap.addOnce(restart,this);						
					}
				}
			};
		};
		
	};
	
};
