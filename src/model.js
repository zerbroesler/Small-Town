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
	
	// Model
	
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
};
