function Model(game) {

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
	var housesCount = 0;
	var housesText;
	var resourceCount = 0;
	
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
		sprite.data.angry = 0;
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
	this.getHouseCount = function(){
		return housesCount;
	};
	this.setHousesText = function(housesTextIn){
		housesText = housesTextIn;
	};
	this.addHouse = function(){
		housesCount++;
		housesText.text = "" + housesCount;
	};
	this.useHouse = function(){
		if(housesCount === 0){
			return false;
		}
		housesCount--;
		housesText.text = "" + housesCount;
	};
	
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
				var value = 100/(houses.getHousePlaces(sprite.data.x,sprite.data.y).totalPlaces+3);
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
			if(sprite.data.counter === 1000){
				sprite.frame = sprite.frame+4;
			}
			if(sprite.data.counter === 2000){
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
					sprite.data.angry++;
					if(sprite.data.angry==4){
							// Game over
						that.stateText.text=" GAME OVER ";
						that.stateText.visible = true;
						game.paused = true;
					}
				}
			};
		};
		
	};
	
	this.manageResources = function(){
		resourceCount++;
		if(resourceCount % 300 === 0){
			this.addHouse();
		}
	};
	
};
