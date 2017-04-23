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
	var spriteNo = 0;
	
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
		spriteNo++;
		sprites.push(sprite);
	}
	this.removeSprite = function(sprite){
		sprites = sprites.filter(function(current){
			return (current.data.no !== sprite.data.no)
		});
	}
	this.getSprites = function(){
		return sprites;
	}
	
};
