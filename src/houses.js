function Houses(model){
	
	var isMyColor = function(tile,color){
		if(Math.floor((tile.index-1)/40)==color){
			return true;
		}else{
			return false;
		}
	};
	
	var calculateHouseShape = function(x,y,color){
		var mapLayer = model.getMapLayer();
		var map = model.getGameMap().getMap();
		var left = 0;
		var right = 0;
		var top = 0;
		var down = 0;
		var neighbours = 0;
		
		if(x < 0 || x >= map.width || y < 0 || y >= map.height){
			return;
		}

		var center = map.getTile(x,y);
		if(isMyColor(center,color)===false){
			return;
		}

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
		if(y+1<map.height){
			down = map.getTile(x,y+1);
			if(isMyColor(down,color)===true){
				neighbours += 8;
			}
		}
		var houseTable = [0,2,1,3,3,3,3,3,4,6,5,7,7,7,7,7];
		
		var newHouse = houseTable[neighbours];
/*
		if(center.index === 1){
			newHouse += (color) * 40 + 1;
			map.putTile(newHouse, x, y, mapLayer);
			return newHouse;
		}else{
			*/
			var old = center.index - 1;
			old = old - old % 8;
			newHouse += old + 1;
			map.putTile(newHouse, x, y, mapLayer);
			return newHouse;
//		}
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
		if(map.getTile(x,y).index===1){
			// Put only on grass
			map.putTile(color*40+1, x, y, mapLayer);
		}
		var currentTile = calculateHouseShape(x,y,color);
		calculateHouseShape(x-1,y,color);
		calculateHouseShape(x+1,y,color);
		calculateHouseShape(x,y-1,color);
		calculateHouseShape(x,y+1,color);
		
		
		
//		map.putTile(currentTile, x, y, mapLayer);
	}
}