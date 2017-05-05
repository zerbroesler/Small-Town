function GameMenu(){
	
	
	var that = this;
	
	this.create = function() {
		var graphics = game.add.graphics(0, 0);
		var instructionButton = new LabelButton(game,game.world.centerX-200,game.world.height-100,'button', 'Instructions', function() {
			game.state.start("GameInstructions");
		},this,1,0);
		instructionButton.anchor.setTo(0.5);
		var startGameButton   = new LabelButton(game,game.world.centerX+200,game.world.height-100,'button', 'Start Game', function() {
			game.state.start("Game");
		},this,1,0);
		startGameButton.anchor.setTo(0.5);
	};
}
