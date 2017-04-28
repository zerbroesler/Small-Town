function GameInstructions(){
	
	
	var that = this;
	var currentYPos = 55;

	var textline = function(text){
		var line = game.add.text(50, currentYPos, text, {
			fill : 'white',
			font : '24px Arial'
		});
		currentYPos += 40; 
	};
	
	this.preload = function(){
		game.load.spritesheet('houses', 'pic/houses.png',32,32);
	};
	
	this.create = function() {
		currentYPos = 55;
	    game.stage.backgroundColor = "#001122";
		var title = game.add.text(game.world.centerX, 22, 'Instructions', {
			fill : 'white',
			font : '34px Arial',
			fontWeight: 'bold'
		});
		title.anchor.setTo(0.5);

		textline("Choose a color                      And build Houses ");
		game.add.sprite(220 , 55, 'col1').scale.setTo(0.7,0.7);
		game.add.sprite(250 , 55, 'col2').scale.setTo(0.7,0.7);
		game.add.sprite(280 , 55, 'col3').scale.setTo(0.7,0.7);
		game.add.sprite(310 , 55, 'col4').scale.setTo(0.7,0.7);
		game.add.sprite(560 , 55, 'houses',0).scale.setTo(0.8,0.8);
		game.add.sprite(590 , 55, 'houses',2).scale.setTo(0.8,0.8);
		game.add.sprite(620 , 55, 'houses',1).scale.setTo(0.8,0.8);
		game.add.sprite(650 , 55, 'houses',3).scale.setTo(0.8,0.8);
		textline("...for the people");
		game.add.sprite(225 , 92, 'maennchen',0);
		game.add.sprite(260 , 92, 'maennchen',1);
		game.add.sprite(295 , 92, 'maennchen',2);
		game.add.sprite(330 , 92, 'maennchen',3);
		textline("");
		textline("They will turn angry           and very angry          when there is no free house");
		game.add.sprite(280 , 172, 'maennchen',7);
		game.add.sprite(510 , 172, 'maennchen',11);
		textline("");
		textline("When two very angry meet             ...they continue together monsterous");
		game.add.sprite(350 , 252, 'maennchen',11);
		game.add.sprite(380 , 252, 'maennchen',11);
		game.add.sprite(820 , 232, 'maennchen',11).scale.setTo(2,2);
		textline("");
		textline("People in houses                 Stay happy, but happier in small houses");
		game.add.sprite(260 , 332, 'houses',4);
		game.add.sprite(292 , 332, 'houses',5);
		game.add.sprite(785 , 332, 'houses',6);
		
		instructionButton = new LabelButton(game,game.world.centerX,game.world.height-60,'button', 'Back', function() {
			game.state.start("GameMenu");
		},this,1,0);
		instructionButton.anchor.setTo(0.5);
	};
}
