// Undo button
// Restart button
// Update Info Board, maybe "player X has placed in cell 4", "You can't do that!!", "Player has won!"
// AI, playerTwo function



const controller = (() => {
    let activePlayer = 1;
    const infoBoard = document.querySelector(".info-board")
    const undoBtn = document.querySelector(".undo");
    const restartBtn = document.querySelector(".reset");
    undoBtn.addEventListener("click", () => {gameBoard.deleteMarker()});
    restartBtn.addEventListener("click", () => {gameBoard.restartBoard(true)});

    const getActivePlayer = () => {return activePlayer};

    //if player one is active, change to player two, else vice versa
    const changeActivePlayer = () => {
        activePlayer == 1 ? activePlayer = 2 : activePlayer = 1;
        document.querySelector(".player-one").classList.toggle("active-player");
        document.querySelector(".player-two").classList.toggle("active-player");
    };

    // UPDATE INFO BOARD

    // CHECK WIN CONDITION
    const checkWinCondition = (gameCells) => {
        let winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

        let index = winConditions.findIndex(condition => (gameCells[condition[0]] == gameCells[condition[1]] && gameCells[condition[0]] == gameCells[condition[2]]));

        if (index !== -1) {
            gameBoard.toggleGameBoard(0);
            gameBoard.bounceMarkers(winConditions[index]);
            gameBoard.resetGameCells();
            undoBtn.disabled = true;
            restartBtn.disabled = true;
            activePlayer == 1 ? updateInfoBoard("Two") : updateInfoBoard("One");
            setTimeout(() => {
                undoBtn.disabled = false;
                restartBtn.disabled = false;
                gameBoard.restartBoard(false);
            }, 3000);
            // changeActivePlayer();
        };
    };

    const updateInfoBoard = (player) => {
        let text = "";
        if (player == "One") {
            text += 'Player One has won!';
        } else {
            text += 'Player Two has won!';
        };

        text += ' Starting next round in';

        infoBoard.textContent = text + ' 3..';
        setTimeout(() => {infoBoard.textContent = text + ' 2..'}, 1000);
        setTimeout(() => {infoBoard.textContent = text + ' 1..'}, 2000);
        setTimeout(() => {infoBoard.textContent = 'Begin!';}, 3000);
    };

    return {getActivePlayer, changeActivePlayer, checkWinCondition};
})();

const gameBoard = (function () {
    // Variable to determine state of game, either game is done and board is deactivated (value = 0), or game is active (value = 1)
    let gameState;

    let gameCells = [0,1,2,3,4,5,6,7,8];

    // History array
    let gameHistory = [];

    const resetGameCells = () => gameCells = [0,1,2,3,4,5,6,7,8];

    const board = Array.from(document.querySelectorAll(".game-cell"));
    board.forEach(cell => {
        cell.addEventListener("click", e => {
            if(e.target.nodeName == "DIV") placeMarker(e.target, controller.getActivePlayer());
        });
    });

    

    //place marker function
    const placeMarker = (cell, activePlayer) => {
        if (!cell.classList.contains("placed")) {
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


    const deleteMarker = () => {
        if (!gameHistory.length == 0) {
            const targetCell = board.find(cell => cell.dataset.cell == gameHistory[gameHistory.length - 1]);
            // Get rid of marker in cell
            Array.from(targetCell.children).forEach(marker => {
                if (!marker.classList.contains("inactive")) marker.classList.toggle("inactive");
            });
            // Remove the 'placed' class for specified cell
            targetCell.classList.toggle("placed")
            // Edit gameCells array
            gameCells[gameHistory[gameHistory.length - 1] - 1] = gameHistory[gameHistory.length - 1] - 1
            // Pop out latest cell placement
            gameHistory.pop();
            controller.changeActivePlayer();
        };
    };

    // Bounce markers
    const bounceMarkers = (markers) => {
        let targets = [];

        // Toggle 'bounce' class to make winning markers bounce
        markers.forEach(marker => {
            let target = Array.from(board[marker].children);
            target = target.filter(xo => !xo.classList.contains("inactive"));
            target[0].classList.toggle("bounce");
            targets.push(target[0]);
        });

        // Remove 'bounce' class from winning markers
        setTimeout(() => {targets.forEach(target => {target.classList.toggle("bounce")})}, 500);
    };

    const restartBoard = (userTriggered) => {
        if (userTriggered == true) {
            let x = gameHistory.length;
            for (let i = 0; i <= x; i++) deleteMarker();
        } else {
            board.forEach(cell => {
                Array.from(cell.children).forEach(marker => {
                    if (!marker.classList.contains("inactive")) marker.classList.toggle("inactive");
                });
            });
            // Other player starts next round
            if (gameHistory[0] == 'X' && controller.getActivePlayer() == 1) {
                controller.changeActivePlayer();
            } else if (gameHistory[0] == 'O' && controller.getActivePlayer() == 2) {
                controller.changeActivePlayer();
            };
            // Empty game history
            gameHistory = [];
            toggleGameBoard(1);
        } 
    };

    // Function disables or enables board. State = 0 is disabled state, 1 is enabled
    const toggleGameBoard = (state) => {
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
    
    return {resetGameCells, placeMarker, deleteMarker, bounceMarkers, restartBoard, toggleGameBoard}
})();

// CREATE PLAYER TWO WITH MULTIPLE IF ELSE
// THAT CHECKS STATE OF PLAYER TWO (i.e if tis easy, medium, etc.) AND EXECUTES AI STUFF OR NOTHING IF CUSTOM PLAYER TWO
// AI will click one of the cells
const createPlayer = () => {
    let playerCells = []

}