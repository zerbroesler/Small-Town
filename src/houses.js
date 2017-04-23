function Houses(model){
	
	var isMyColor = function(tile,color){
		var index = tile.index - 1;
		if(index< 3 || index > 20){
			return false;
		}
		index = index % 25 - 3;
		if(index % 4 === color -1){
			return true;
		}
		return false;
	};
	
	var calculateHouseShape = function(x,y,color){
		var map = model.getGameMap().getMap();
		var left = 0;
		var right = 0;
		var top = 0;
		var down = 0;
		var neighbours = 0;

		if(x-1>=0){
			left = map.getTile(x-1,y);
			if(isMyColor(left,color)===true){
				neighbours += 1;
			}
		}
		if(x+1<map.width){
			right = map.getTile(x+1,y);
			if(isMyColor(right,color)===true){
				neighbours += 2;
			}
		}
		if(y-1>=0){
			top = map.getTile(x,y-1);
			if(isMyColor(top,color)===true){
				neighbours += 4;
			}
		}
		if(y-1<=map.height){
			down = map.getTile(x,y+1);
			if(isMyColor(down,color)===true){
				neighbours += 8;
			}
		}
		var houseTable = [0,8,4,12,12,12,12,12,16,17,18,16,16,16,16,16];
		
		var newHouse = houseTable[neighbours];
		return newHouse+4;
	}
	
	this.setHouse = function(x,y,color){
		// Sets a house in the given color
		var map = model.getGameMap().getMap();
		if(x >= map.width){
			return;
		}
		if(y >= map.height){
			return;
		}
		var mapLayer = model.getMapLayer();
		var currentTile = calculateHouseShape(x,y,color);
		if(currentTile<20){
			currentTile += color-1;
		}
		map.putTile(currentTile, x, y, mapLayer);
	}
}