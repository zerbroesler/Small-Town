function Splash() {

	this.loadScripts = function() {
	};

	this.loadBgm = function() {
	};

	this.loadImages = function() {
		game.load.spritesheet('maennchen', 'pic/maennchen.png', 32, 32);
		game.load.image('col1', 'pic/blue.png');
		game.load.image('col2', 'pic/green.png');
		game.load.image('col3', 'pic/yellow.png');
		game.load.image('col4', 'pic/purple.png');
		// Game menu buttons
		game.load.spritesheet('button', 'pic/buttonCyan.png',185,45);
		
		
		// Load maps
		game.load.tilemap('level_01', 'maps/level_01.json', null,Phaser.Tilemap.TILED_JSON);
		game.load.image('ground', 'pic/ground.png');
		

	};

	this.loadFonts = function() {
	};

	var status;
	// The preload function then will call all of the previously defined functions:
	this.preload = function() {
		// Add the loadingbar to the scene:
		var loadingBar = game.add.sprite(game.world.centerX, 400, "loadingBar");
		loadingBar.anchor.setTo(0.5);
		// Tell phaser to use laodingBar as our preload progess bar
		status = game.add.text(game.world.centerX, 400, 'Loading...', {
			fill : 'white'
		});
		status.anchor.setTo(0.5);
		this.load.setPreloadSprite(loadingBar);

		this.loadScripts();
		this.loadImages();
		this.loadFonts();
		this.loadBgm();
	};

	this.addGameStates = function() {

	    game.state.add("GameMenu",GameMenu);
		game.state.add("Game", Game);
		game.state.add("GameInstructions", GameInstructions);
		//		    game.state.add("GameOver",GameOver);
		//		    game.state.add("Credits",Credits);
		//		    game.state.add("Options",Options);
	},

	this.addGameMusic = function() {
//		music = game.add.audio('dangerous');
//		music.loop = true;
//		music.play();
	};

	this.create = function() {
		status.setText('Ready!');
		this.addGameStates();
		this.addGameMusic();

		setTimeout(function() {
			game.state.start("GameMenu");
		}, 300);
	};
};