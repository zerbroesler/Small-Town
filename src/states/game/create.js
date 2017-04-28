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
//		game.add.text(470,16,"Small town", { fill: '#ffffff',fontSize : 50 });

		gameMap.init();
		model.init();
		
		// Buttons
		var selectXPos = 680;
		game.add.text(selectXPos+20,30,"Select Color", { fill: '#ffffff',fontSize : 36 });
		game.add.button(selectXPos,100,'col1', function() {
			model.setColor(1);
		});
		game.add.button(selectXPos+70,100,'col2', function() {
			model.setColor(2);
		});
		game.add.button(selectXPos+140,100,'col3', function() {
			model.setColor(3);
		});
		game.add.button(selectXPos+210,100,'col4', function() {
			model.setColor(4);
		});
		
		game.add.text(selectXPos+77,150,"Score", { fill: '#ffffff',fontSize : 36 });
		scoreText = game.add.text(selectXPos+77, 190, model.getScore(), { fontSize: '36px', fill: '#ffffff',boundsAlignH : "right" });
		model.setScoreText(scoreText);

		game.add.text(selectXPos+67,250,"Houses", { fill: '#ffffff',fontSize : 36 });
		housesText = game.add.text(selectXPos+120, 290, model.getHouseCount(), { fontSize: '36px', fill: '#ffffff',boundsAlignH : "right" });
		model.setHousesText(housesText);

	    var stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;
		model.stateText = stateText;

		
		// User selection
		var userSelection = new UserSelection(game,model);
		model.setSelection(userSelection);
		userSelection.init();

	}
}