/**
 * Init all game relevant stuff
 */
function Create(game, model, tool) {



	return function() {
		// Fuction called after 'preload' to setup the game
		var gameMap = model.getGameMap();
		
		// Init data model
		var graphics = game.add.graphics(0, 0);
		model.setGraphics(graphics);
		
		game.stage.backgroundColor = c.color.backgound;
		var lines = [];
		game.add.button(1000,100,'reset', function() {
			model.resetLevel();
		});
		game.add.text(470,16,"Small town", { fill: '#ffffff',fontSize : 50 });

		gameMap.init();
		
	};

}