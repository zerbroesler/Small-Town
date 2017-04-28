/*
 * Inits the game and starts the main state which calls the other states 
 */
function Game() {

	var gameState = {};
	var tool = {
		events : {}
	};
	var model = new Model(game);
	var gameMap = new GameMap(game, model);
	model.setGameMap(gameMap);

	this.create = Create(game, model, tool);
	this.update = Update(game, model, tool);
	this.render = Render(game, model, tool);
};
