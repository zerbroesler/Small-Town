function GameMenu(){
	
	
	var that = this;
	
	this.create = function() {
		
		game.add.sprite(0,-75, 'titleScreen').scale.setTo(1.05,1.05);
		
		instructionButton = new LabelButton(game,game.world.centerX-200,game.world.height-40,'button', 'Instructions', function() {
			game.state.start("GameInstructions");
		},this,1,0);
		instructionButton.anchor.setTo(0.5);
		startGameButton   = new LabelButton(game,game.world.centerX+200,game.world.height-40,'button', 'Start Game', function() {
			game.state.start("Game");
		},this,1,0);
		startGameButton.anchor.setTo(0.5);
	};
}
