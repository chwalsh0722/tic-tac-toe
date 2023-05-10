let board = [];
let gameStarted = false;
let player1Name;
let player2Name;
let player1Turn = false;
let gameOver = false;

function Tile(tileID, marker) {
  this.tileID = tileID;
  this.marker = marker;
  this.setMarker = function(newMarker) {
    this.marker = newMarker;
  };
  this.getTileMarker = function() {
    return marker;
  }
  this.getTileID = function() {
    return tileID;
  };
  this.tileClicked = function(newMarker) {
    if (marker === "") {
      this.setMarker(newMarker);
    }
  }
};

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

checkPlayerTurn = () => {
  if (player1Turn == false) {
    return "O";
  } else {
    return "X";
  }
};

changePlayerTurn = () => {
  if (player1Turn == true) {
    player1Turn = false;
  } else {
    player1Turn = true;
  }
};

checkWinCon = (tilesMarked, winCon, marker) => {
  for (let n = 0; n < 3; n++) {
    if (tilesMarked.includes(winCon[n])) {
      continue;
    } else {
      return null;
    }
  }

  // Executes if all three tiles are present for win condition to be met.
  return marker;
}

checkForWinner = () => {
  // Create array for storing ID of tiles containing X.
  let xTiles = [];

  // Create array for storing ID of tiles containing O.
  let oTiles = [];

  // Winner is declared if three connected cells contain the same marker.
  // Create arrays of winning tile combinations.
  // Rows.
  let winCon1 = ["tile0", "tile1", "tile2"];
  let winCon2 = ["tile3", "tile4", "tile5"];
  let winCon3 = ["tile6", "tile7", "tile8"];

  // Columns.
  let winCon4 = ["tile0", "tile3", "tile6"];
  let winCon5 = ["tile1", "tile4", "tile7"];
  let winCon6 = ["tile2", "tile5", "tile8"];

  // Diagonals.
  let winCon7 = ["tile0", "tile4", "tile8"];
  let winCon8 = ["tile2", "tile4", "tile6"];

  let winCons = [winCon1, winCon2, winCon3, winCon4, winCon5, winCon6, winCon7, winCon8];

  // Check markers on board, see if board contains a winning combination.
  // Check board for X markers first.
  // Loop through each board tile.
  for (let i = 0; i < 9; i++) {
    let currentTileID = board[i].getTileID();
    let currentTileMarker = board[i].marker;

    if (currentTileMarker === "X") {
      xTiles.push(currentTileID);
    } else if (currentTileMarker === "O") {
      oTiles.push(currentTileID);
    } else {
      continue;
    }

    // Loop through each win condition.
    for (let j = 0; j < 8; j++) {
      let currentWinCon = winCons[j];

      if (checkWinCon(xTiles, currentWinCon, "X") === "X") {
        return "X";
      } else if (checkWinCon(oTiles, currentWinCon, "O") === "O") {
        return "O";
      } else {
        continue;
      }
    }
  }
  return null;
}

markTile = (tileID) => {
  // Check that game has started.
  if (!gameStarted) {
    return;
  }

  // Use tileID to get the clicked tile's object from 'board' array.
  let currentTile = getTileClicked(tileID);

  // Check if current tile has a marker already.
  if (currentTile.marker != "") {
    return;
  }

  // Change marker for clicked tile object based on which player is taking their turn.
  currentTile.setMarker(checkPlayerTurn());

  // Get tile element from HTML and add the marker to it.
  let tileClicked = document.getElementById(tileID);
  tileClicked.innerHTML = currentTile.marker;

  // Check for a winner.
  let winner = checkForWinner();
  if (winner != null) {
    if (winner === "X") {
      window.alert(player1Name + " wins!");
    } else {
      window.alert(player2Name + " wins!");
    }
    gameStarted = false;
    return;
  }

  // Switch player turn.
  changePlayerTurn();
};

newGame = () => {
  player1Name = window.prompt("Player 1 name");
  if (player1Name == null) {
    return;
  }
  player2Name = window.prompt("Player 2 name");
  if (player2Name == null) {
    return;
  }
  gameStarted = true;
}

resetBoard = () => {
  for (let i = 0; i < 9; i++) {
    board[i].setMarker("");
    let currentTile = document.getElementById(board[i].getTileID());
    currentTile.innerHTML = "";
  }
}

// Create tile objects for use on game board.
createBoardTiles();