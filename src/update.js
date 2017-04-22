function Update(game, model, tool) {

	var controller = new Controller(model);
	var down = false;
	var won = false;


	return function() {
		// Function called 60 times per second
		var aMoving = [];
		var graphics = model.getGraphics();
		graphics.clear();


		
		// Find out where the mouse is
        var mx = game.input.activePointer.worldX;
        var my = game.input.activePointer.worldY;
		var oRectData = null;

		// Set brush position

		// Process mouse
		if (game.input.mousePointer.isDown && down === false && won === false){
			down = true;
			// move all rects to the moving array
			model.setMoving(aMoving);
			model.move();
			if(model.checkIfIn()===true){
				won = true;
				if(model.getLevel()===4){
					var but = game.add.button(300,200,'wonGame', function() {
						model.setLevel(0);
						model.resetLevel();
						won = false;
						but.kill();
					}, this);
				}else{
					var but = game.add.button(900,250,'nextLevel', function() {
						model.nextLevel();
						won = false;
						but.kill();
					}, this);
				}
			}
		}else{
			down = false;
		}
	};
}
