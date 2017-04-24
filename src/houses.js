function Houses(model){
	
	var groundCount = c.grid.x * c.grid.y;
	var houses = new Array(groundCount);
	houses.fill(0);
	houses = houses.map(Number.call, Number);
	
	var isMyColor = function(tile,color){
		if(Math.floor((tile.index-1)/40)==color){
			return true;
		}else{
			return false;
		}
	};
	
	var getTileId = function(index){
		return (index-1) %8;
	};
	var getOccupied = function(index){
		return Math.floor((index-1) % 40 / 8);
	};
	
	var outOfBounds = function(x,y){
		if(x < 0 || x >= c.grid.x || y < 0 || y >= c.grid.y){
			return true;
		}
		return false;
	};
	
	var checkNeighbour = function(x,y,color,neighbourList){
		if(outOfBounds(x,y)===true){
			return false;
		}
		var map = model.getGameMap().getMap();
		var tile = map.getTile(x,y);
		if(isMyColor(tile,color)===true){
			neighbour = {
					tile : tile,
					x : x,
					y : y
			};
			neighbourList.push(neighbour);
			return true;
		}else{
			return false;
		}
	};
	
	var getNeighbours = function(x,y,color){
		var neighbour;
		var neighbours = 0;
		var neighbourList = [];
		var map = model.getGameMap().getMap();
		if(checkNeighbour(x-1,y,color,neighbourList) !== false){
			neighbours += 1;
		}
		if(checkNeighbour(x+1,y,color,neighbourList) !== false){
			neighbours += 2;
		}
		if(checkNeighbour(x,y-1,color,neighbourList) !== false){
			neighbours += 4;
		}
		if(checkNeighbour(x,y+1,color,neighbourList) !== false){
			neighbours += 8;
		}
		return {
			neighbours : neighbours,
			neighbourList : neighbourList
		};
	}
	
	var calculateHouseShape = function(x,y,color){
		var mapLayer = model.getMapLayer();
		var map = model.getGameMap().getMap();
		var left = 0;
		var right = 0;
		var top = 0;
		var down = 0;
		var result = {
			neighbours : 0,
			neighbourList : []
		};			

		
		if(outOfBounds(x,y)){
			return result;	
		};

		var center = map.getTile(x,y);
		if(isMyColor(center,color)===false){
			return result;	
		}
		var neighbours = getNeighbours(x,y,color);
		var houseTable = [0,2,1,3,3,3,3,3,4,6,5,7,7,7,7,7];
		var newHouse = houseTable[neighbours.neighbours];
		var old = center.index - 1;
		old = old - old % 8;
		newHouse += old + 1;
		map.putTile(newHouse, x, y, mapLayer);
		return neighbours;
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
		var neighbours = calculateHouseShape(x,y,color);
		var that = this;
		neighbours.neighbourList.forEach(function(neighbour){
			calculateHouseShape(neighbour.x,neighbour.y,color);
			that.connectHouses(x,y,neighbour.x,neighbour.y);
		});
		
	};
	var indexFromCoordinates = function(x,y){
		if(outOfBounds(x,y)){
			return -1;
		};
		return y * c.grid.x + x;
	};
	var coordinatesFromIndex = function(index){
		result = { x:0, y:0 };
		if(index<0){
			return result;
		}
		result.y = Math.floor(index / c.grid.x);
		result.x = index - result.y * c.grid.x;
		return result;
	}
	
	// Quick union. See: http://algs4.cs.princeton.edu/15uf/
	var root = function(index){
		while(index != houses[index]){
			houses[index] = houses[houses[index]];
			index = houses[index];
		}
		return index;
	};
	
	var connected = function(index1,index2){
		return root(index1) == root(index2);
	};
	
	var union = function(index1,index2){
		// check out of bounds condition
		if(index1 === -1 || index2 === -1){
			return;
		}
		var root1 = root(index1);
		var root2 = root(index2);
		houses[root1] = houses[root2];
	};
	
	this.getFreeInHouse = function(index){
		var map = model.getGameMap().getMap();
		var coordinates = coordinatesFromIndex(index);
		var tile = map.getTile(coordinates.x,coordinates.y);
		var tileId = getTileId(tile.index);
		var occupied = getOccupied(tile.index);
		var freeRooms = [1,2,2,3,2,3,3,4];
		return {
			free: freeRooms[tileId]-occupied,
			total : freeRooms[tileId] 
		};
	};
	
	this.connectHouses = function(x1,y1,x2,y2){
		// Connects the center with the ones around (left,right... etc)
		var first = indexFromCoordinates(x1,y1); 
		var other = indexFromCoordinates(x2,y2); 
		union(first,other);
	};
	this.getHousePlaces = function(x,y){
		var entry = indexFromCoordinates(x,y);
		var connected = [];
		var freePlaces = 0;
		var totalPlaces = 0;
		var rootHouse = houses[entry];
		for (var index = 0; index < houses.length; index++) {
			if(rootHouse === root(houses[index])){
				freePlaces += this.getFreeInHouse(index).free;
				totalPlaces += this.getFreeInHouse(index).total;
				if(freePlaces > 0){
					connected.push(index);
//					break;
				}
			}
		}		
		return { 
			freePlaces : freePlaces,
			totalPlaces : totalPlaces,
			connected : connected
		};
		console.log(connected);
		console.log(freePlaces);
	};
	this.occupyTile = function(index){
		var map = model.getGameMap().getMap();
		var coordinates = coordinatesFromIndex(index);
		var tile = map.getTile(coordinates.x,coordinates.y);
		map.putTile(tile.index+8,coordinates.x,coordinates.y);
	};
	
	this.enterHouse = function(x,y){
		var map = model.getGameMap().getMap();
		var tile = map.getTile(x,y);
		var freeHousePlaces = this.getHousePlaces(x,y);
		if(freeHousePlaces.freePlaces >0){
			this.occupyTile(freeHousePlaces.connected[0]);
		}
	};
}