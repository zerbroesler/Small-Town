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
		game.add.text(470,16,"Small town", { fill: '#ffffff',fontSize : 50 });

		gameMap.init();
		
		// Buttons
		game.add.text(1030,30,"Select Color", { fill: '#ffffff',fontSize : 32 });
		game.add.button(1000,100,'col1', function() {
			model.setColor(1);
		});
		game.add.button(1070,100,'col2', function() {
			model.setColor(2);
		});
		game.add.button(1140,100,'col3', function() {
			model.setColor(3);
		});
		game.add.button(1210,100,'col4', function() {
			model.setColor(4);
		});
		
		// User selection
		var userSelection = new UserSelection(game,model);
		model.setSelection(userSelection);
		userSelection.init();
		
		// Sprite
		sprite = game.add.sprite(464 , 100, 'maennchen');
		sprite.data.no=1;
		model.addSprite(sprite);
		sprite = game.add.sprite(464 , 400, 'maennchen');
		sprite.data.no=2;
		model.addSprite(sprite);


	}
}