function Splash(){
	
	this.loadScripts = function () {
	};

	this.loadBgm = function () {
	};

	this.loadImages = function () {
		game.load.spritesheet('maennchen','pic/maennchen.png',32,32);

	};

	this.loadFonts = function () {
	};

	// The preload function then will call all of the previously defined functions:
	this.preload = function () {
	    // Add the loadingbar to the scene:
	    var loadingBar = game.add.sprite(game.world.centerX, 400, "loadingBar");
	    loadingBar.anchor.setTo(0.5);	    
	    // Tell phaser to use laodingBar as our preload progess bar
	    var status = game.add.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
	    status.anchor.setTo(0.5);
	    this.load.setPreloadSprite(loadingBar);
	    
		this.loadScripts();
		this.loadImages();
		this.loadFonts();
		this.loadBgm();
	};
};