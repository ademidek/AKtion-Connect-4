var redPlayer = "Red";
var yellowPlayer = "Yellow";
var currentPlayer = redPlayer;
var gameOver = false;
var board;
var rows = 6;
var columns = 7;
var currentColumn;

window.onload =  function() {
    setGame();
}

function setGame(){
    board = [];
    currentColumn = [5,5,5,5,5,5,5];
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++){
            row.push(" "); 

            // Create a new div for each tile
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // Assign a unique ID to each tile
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if(gameOver){
        return;
    }

    let position = this.id.split("-");
    let row = parseInt(position[0]);
    let column = parseInt(position[1]);
    
    row = currentColumn[column];
    if (row < 0){
        return;
    }

    board[row][column] = currentPlayer;
    let tile = document.getElementById(row.toString() + "-" + column.toString());
    if(currentPlayer == redPlayer){
        tile.classList.add("redchip");
        currentPlayer = yellowPlayer;
    }else{
        tile.classList.add("yellowchip");
        currentPlayer = redPlayer;
    }

    row = row - 1;
    currentColumn[column] = row;
}
