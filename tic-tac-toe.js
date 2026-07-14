function createPlayer(name, symbol){
    const playerName = name;
    const playerSymbol = symbol;
    let score = 0;

    function incrementScore(){
        score++;
        return score;
    }

    function resetScore(){
        score = 0;
    }

    function getName(){
        return playerName;
    }

    function getSymbol(){
        return playerSymbol;
    }

    function getScore(){
        return score;
    }

    return {
        incrementScore,
        resetScore,
        getName,
        getSymbol,
        getScore
    };
}

function createGameBoard(){
    const board = Array.from({length: 3}, ()=> Array(3).fill(null));

    function checkSlot(row, column){
        if(board[row][column] == null){
            return true;
        }else{
            return false;
        }
    }

    function fillSlot(row, column, playerSymbol){
        if(checkSlot(row, column)){
            board[row][column] = playerSymbol;
            return true;
        }else{
            console.log("Intenta con otra casilla");
            return false;
        }
    }

    function resetBoard(){
        for (let i = 0; i < board.length; i++) {
            board[i].fill(null);
        }
    }

    function getBoard(){
        return board.map(row => [...row]);
    }

    return {
        checkSlot,
        fillSlot,
        resetBoard,
        getBoard
    };
}

function createGame(player1, player2, gameBoard){
    let currentPlayer = player1;

    function switchTurn(){
        if(currentPlayer === player1){
            currentPlayer = player2;
        }else{
            currentPlayer = player1;
        }
    }

    function getCurrentPlayer(){
        return currentPlayer;
    }

    function checkThreeInARow(a, b, c){
        if(a === b && b === c && a !== null){
            return a;
        }
        return null;
    }

    function checkWinner(){
        const board = gameBoard.getBoard();

        const rows = [
            checkThreeInARow(board[0][0], board[0][1], board[0][2]),
            checkThreeInARow(board[1][0], board[1][1], board[1][2]),
            checkThreeInARow(board[2][0], board[2][1], board[2][2])
        ];

        const columns = [
            checkThreeInARow(board[0][0], board[1][0], board[2][0]),
            checkThreeInARow(board[0][1], board[1][1], board[2][1]),
            checkThreeInARow(board[0][2], board[1][2], board[2][2])
        ];

        const diagonals = [
            checkThreeInARow(board[0][0], board[1][1], board[2][2]),
            checkThreeInARow(board[0][2], board[1][1], board[2][0])
        ];

        const winningSymbol = [...rows, ...columns, ...diagonals].find(result => result !== null);

        if(winningSymbol === player1.getSymbol()){
            return player1;
        } else if(winningSymbol === player2.getSymbol()){
            return player2;
        } else {
            return null;
        }
    }

    function checkTie(){
        const board = gameBoard.getBoard();
        return board.every(row => row.every(cell => cell !== null));
    }

    function playRound(row, column){
        const success = gameBoard.fillSlot(row, column, currentPlayer.getSymbol());

        if(!success){
            return;
        }

        const winner = checkWinner();

        if(winner){
            winner.incrementScore();
            return;
        }

        if(checkTie()){
            console.log("Tie");
            return;
        }

        switchTurn();
    }

    function resetGame(){
        gameBoard.resetBoard();
        currentPlayer = player1;
    }

    return {
        getCurrentPlayer,
        playRound,
        resetGame
    };
}


const player1 = createPlayer("Player1","X");
const player2 = createPlayer("Player2","O");
const gameBoard = createGameBoard();
const game = createGame(player1, player2, gameBoard);


//DOM
const playerHeaderDiv = document.createElement("div");
const gameBoardDiv = document.createElement("div");
const buttonsDiv = document.createElement("div");

let p1Name = document.createElement("p");
let p2Name = document.createElement("p");

playerHeaderDiv.appendChild(p1Name);
playerHeaderDiv.appendChild(p2Name);

function updatePlayerHeader(){
    p1Name.textContent = `${player1.getName()} ${player1.getSymbol()}: ${player1.getScore()}`;
    p2Name.textContent = `${player2.getName()} ${player2.getSymbol()}: ${player2.getScore()}`;
}

function renderBoard(){
    gameBoardDiv.innerHTML = "";

    const board = gameBoard.getBoard();

    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[row].length; column++) {
            let cellButton = document.createElement("button");
            cellButton.textContent = board[row][column] === null ? "" : board[row][column];

            cellButton.addEventListener("click", function(){
                game.playRound(row, column);
                renderBoard();
                updatePlayerHeader();
            });

            gameBoardDiv.appendChild(cellButton);
        }
    }
}

let playAgainButton = document.createElement("button");
playAgainButton.textContent = "Play Again";

playAgainButton.addEventListener("click", function(){
    game.resetGame();
    renderBoard();
});

let resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";

resetButton.addEventListener("click", function(){
    game.resetGame();
    player1.resetScore();
    player2.resetScore();
    renderBoard();
    updatePlayerHeader();
});

buttonsDiv.appendChild(playAgainButton);
buttonsDiv.appendChild(resetButton);

updatePlayerHeader();
renderBoard();

document.body.appendChild(playerHeaderDiv);
document.body.appendChild(gameBoardDiv);
document.body.appendChild(buttonsDiv);
