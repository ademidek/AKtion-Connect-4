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
    boardData = document.getElementById("board");
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

    endGame();
}

function endGame(){

    //horizontal check
    for(let r = 0; r < rows; r++){
        //checking three spaces to the right to make sure we dont go out of bound
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] != " " && board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]){
                setWinner(r,c);
                return;
            }
        }       
    }

    //vertical check
    for(let r = 0; r < rows - 3; r++){
        //checking three spaces to the right to make sure we dont go out of bound
        for(let c = 0; c < columns; c++){
            if(board[r][c] != " " && board[r][c] == board[r+1][c] && board[r][c] == board[r+2][c] && board[r][c] == board[r+3][c]){
                setWinner(r,c);
                return;
            }
        }       
    }

    //diagonal checks
    for(let r = 0; r < rows - 3; r++){
        //checking three spaces to the right and the top to ensure we dont go out of bounds
        for(let c = 0; c < columns - 3; c++){
            if( board[r][c] != " " && 
                board[r][c] == board[r + 1][c + 1] && 
                board[r][c] == board[r + 2][c + 2] &&
                board[r][c] == board[r + 3][c + 3]){
                setWinner(r,c);
                return;
            }
        }
    }

    for(let r = 3; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if(
                board[r][c] != " " && 
                board[r][c] == board[r - 1][c + 1] && 
                board[r][c] == board[r - 2][c + 2] &&
                board[r][c] == board[r - 3][c + 3]){
                setWinner(r,c);
                return;
            }
        }
    }
}

function setWinner(r,c){
    let winner = document.getElementById("winner");
    if(board[r][c] == redPlayer){
        winner.innerText = "Red Wins!";
    }else{
        winner.innerText = "Yellow Wins!";
    }
    gameOver = true;
}

/*function resetGame(){    
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
    gameOver = false;
    currentPlayer = redPlayer;
    document.getElementById("winner").innerText = "";
}

document.getElementById("reset").addEventListener("click", resetGame); */
