function UserSelection(game,model){

	this.init = function(){
		initColorSelectionFrame();
	}

	var initColorSelectionFrame = function(){
		//  Our painting marker
		marker = game.add.graphics();
		marker.lineStyle(2, 0xe0e0e0, 1);
		marker.drawRect(0, 0, 38, 38);
		marker.lineStyle(2, 0x000000, 1);
		marker.drawRect(2, 2, 34, 34);
		model.setMarker(marker);
	}

	
	this.setColorSelectedFrame = function(){
		var marker = model.getMarker();
		if(marker===null){
			return;
		}
		var color = model.getColor();
		marker.x = 1000 + (color - 1) * 70;
		marker.y = 100;
	};

}