function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;
	var wait = 20;
	
	var addHumanWhenNeeded = function(){
		wait--;
		if(model.getHumans().length<8 && wait < 0){
			human = new Human(game,model);
			model.addHuman(human);
			wait = Math.floor(Math.random()*50)+80;
		}
	};
	
	return function() {
		model.humansBehaviour();
		model.scoring();
		model.manageResources();
		
		var graphics = model.getGraphics();
		graphics.clear();
		var map = model.getGameMap().getMap();

		// Color selector
		var userSelection = model.getSelection();
		userSelection.setColorSelectedFrame();

		// Gameplay
		addHumanWhenNeeded();
		// Move Humans
		var humans = model.getHumans();
		humans.forEach(function(human){
			human.move();
		});
	};
}
