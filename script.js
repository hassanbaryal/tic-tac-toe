

const controller = (() => {
    let activePlayer = 1;
    //check active player

    const getActivePlayer = () => {return activePlayer};

    //if player one is active, change to player two, else vice versa
    const changeActivePlayer = () => {
        activePlayer == 1 ? activePlayer = 2 : activePlayer = 1
    };

    // UPDATE INFO BOARD

    // CHECK WIN CONDITION

    //array = [[0,1,2], [3,4,5], [6,7,8],...]
    // use array.some? use an array method that gets an array item that fits a criteria (i.e. win condition)
    // filter, findIndex (I think findIndex would be best)
    const checkWinCondition = (gameCells) => {
        let winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

        let index = winConditions.findIndex(condition => (gameCells[condition[0]] == gameCells[condition[1]] && gameCells[condition[0]] == gameCells[condition[2]]));

        if (index !== -1) {
            gameBoard.toggleGameBoard(0)
        };
    };

    return {getActivePlayer, changeActivePlayer, checkWinCondition};
})();

const gameBoard = (function () {
    // Variable to determine stae of game, either game is done and board is deactivated (value = 0), or game is active (value = 1)
    let gameState;

    let gameCells = [0,1,2,3,4,5,6,7,8];

    // History array
    let gameHistory = [];

    const board = document.querySelectorAll(".game-cell");
    board.forEach(cell => {
        cell.addEventListener("click", e => {
            if(e.target.nodeName == "DIV") placeMarker(e.target, controller.getActivePlayer());
        });
    });

    

    //place marker function
    const placeMarker = (cell, activePlayer) => {

        if (cell.classList.contains("placed")) {
            //update info board to say u cant do taht, marker is already placed there
        } else {
            // Place Marker
            activePlayer == 1 ? cell.querySelector(".X").classList.toggle("inactive") : cell.querySelector(".O").classList.toggle("inactive");

            // Disable the cell
            cell.classList.toggle("placed");

            // Add cell to game history
            activePlayer == 1 ? gameCells[cell.dataset.cell - 1] = 'X' : gameCells[cell.dataset.cell - 1] = 'O';
            gameHistory.push(cell.dataset.cell);

            // Change active player
            controller.changeActivePlayer();

            // Check win conditions
            if (gameHistory.length >= 5) controller.checkWinCondition(gameCells);
            
        };
        
    };

    //delete marker function


    function toggleGameBoard (state) {
        if (state == 0) {
            board.forEach(cell => {
                if (!(cell.classList.contains("placed"))) cell.classList.toggle("placed");
            });
        } else {
            board.forEach(cell => {
                if ((cell.classList.contains("placed"))) cell.classList.toggle("placed");
            });
        };
        gameState = state;
    };
    
    return {placeMarker, toggleGameBoard}
})();

// CREATE PLAYER TWO WITH MULTIPLE IF ELSE
// THAT CHECKS STATE OF PLAYER TWO (i.e if tis easy, medium, etc.) AND EXECUTES AI STUFF OR NOTHING IF CUSTOM PLAYER TWO
// AI will click one of the cells
const createPlayer = () => {
    let playerCells = []

}