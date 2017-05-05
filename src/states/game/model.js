function Model(game) {

	var that = this;
	var oGraphics = null;
	var gameMap = null;
	var level = 0;
	var color = 1;
	var marker = null;
	var selection = null;
	var houses = new Houses(this);

	var score = 0;
	var housesCount = 1;
	var housesText;
	var resourceCount = 0;
	
	var humans = [];
	var humansHome = [];
	var humanCounter = 0;
	
	var merged = [];
	
	var scoringCounter = 0;
	
	var houseEntered = [];

	this.init = function(){
		housesCount = 1;
		level = 0;
		color = 1;
		marker = null;
		score = 0;
		housesCount = 1;
		housesText = "";
		resourceCount = 0;
		humans = [];
		humansHome = [];
		humanCounter = 0;
		merged = [];
		scoringCounter = 0;
		houseEntered = [];
	};
	
	// Model
	this.getHouses = function(){
		return houses;
	};
	
	this.addHouseEntered = function(point){
		houseEntered.push(point);
		return houseEntered.length-1;
	};
	this.isHouseEntered = function(pointEntered){
		return houseEntered.some(function(element){
			return (element.x === pointEntered.x && element.y === pointEntered.y);
		});
	};
	this.removeHouseEntered = function(id){
		houseEntered.splice(id,1);
	};
	
	this.setColor = function(colorIn){
		color = colorIn;
	};
	this.getColor = function(){
		return color;
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
	
	this.addHuman = function(human){
		human.no = humanCounter++;
		humans.push(human);
	};
	this.removeHuman = function(human){
		humansHome.push(human);
		humans = humans.filter(function(current){
			return (current.no !== human.no)
		});
	};
	this.mergeHuman = function(human,humanMerged){
		// Merges a human into another
		humanMerged.visible = false;
		human.merged.push(humanMerged.no);
		humans = humans.filter(function(current){
			return (current.no !== humanMerged.no)
		});
	};	
	this.getMergedHuman = function(number){
		return merged.filter(function(current){
			return (current.no === number);
		});
	};

	
	this.getHumans = function(){
		return humans;
	};
	
	// Houses to build
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
		scoringCounter++;
		if(scoringCounter % 50 === 0){
			humansHome.forEach(function(human){
				var value = 100/(houses.getHousePlaces(human.x,human.y).totalPlaces+3);
				that.addScore(value);
			});
			scoreText.text = ""+(Math.floor(this.getScore()));
		}
	}
	this.humansBehaviour = function(){
		var that = this;
		var unhappy = [];
		
		humans.forEach(function(human){
			if(human.updateHappyness() == true){
				unhappy.push(human);
			};
		});
		for(var i=0;i<unhappy.length-1;i++){
		human = unhappy[i];
			for(var j=i;j<unhappy.length;j++){
				human2 = unhappy[j];
				if(human.unhappyCollision(human2) === true){
					merged.push(human2);
					human2.invisible();
					this.mergeHuman(human,human2);
				};
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
