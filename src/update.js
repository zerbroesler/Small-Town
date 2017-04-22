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
	};
}
