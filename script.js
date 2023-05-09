let board = [];

function Tile(tileID, marker) {
  this.tileID = tileID;
  this.marker = marker;
  this.setMarker = function(newMarker) {
    this.marker = newMarker;
  };
  this.getTileID = function() {
    return tileID;
  };
  this.tileClicked = function(newMarker) {
    if (marker === "") {
      this.setMarker(newMarker);
    }
  }
};

// // Factory function for creating tile objects
// const Tile = (ID) => {
//   const tileID = ID;
//   let marker = "";

//   const setMarker = (newMarker) => {marker = newMarker};
//   const getMarker = () => {
//     return marker
//   };
//   const getTileID = () => {
//     return tileID
//   };
//   const tileClicked = (newMarker) => {
//     if (this.marker === "") {
//       setMarker(newMarker);
//     }
//   };

//   return {tileClicked, getMarker, getTileID};
// };

// Creates tile objects.
createBoardTiles = () => {
  for (let i = 0; i < 9; i++) {
    const tile = new Tile("tile" + i, "");
    board[i] = tile;
  }
};

getTileClicked = (tileID) => {
  for (let i = 0; i < 9; i++) {
    let thisTile = board[i].getTileID();
    if (tileID === thisTile) {
      return board[i];
    }
  }
};

markTile = (tileID) => {
  // Use tileID to get the clicked tile's object from 'board' array.
  let currentTile = getTileClicked(tileID);

  console.log(currentTile);
  // Change marker for clicked tile object.
  // currentTile.tileClicked("X");
  currentTile.setMarker("O");

  // Get tile element from HTML and add the marker to it.
  let tileClicked = document.getElementById(tileID);
  tileClicked.innerHTML = "O";
};

// Create tile objects for use on game board.
createBoardTiles();