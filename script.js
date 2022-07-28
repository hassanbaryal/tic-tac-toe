

const controller = (() => {
    let activePlayer = 1;
    //check active player

    const checkActivePlayer = () => {return activePlayer};

    //if player one is active, change to player two, else vice versa
    const changeActivePlayer = () => {
        activePlayer == 1 ? activePlayer = 2 : activePlayer = 1
    };

    //update info board

    return {checkActivePlayer, changeActivePlayer};
})();

const gameBoard = (function () {

    const board = Array.from(document.querySelectorAll(".game-cell"));
    board.forEach(cell => {
        cell.addEventListener("click", e => {
            console.log(e.target)
            placeMarker(e.target, controller.checkActivePlayer());
        });
    });

    //history array
    let gameHistory = [];

    //place marker function
    const placeMarker = (cell, activePlayer) => {

        if (cell.classList.contains("placed")) {
            //update info board to say u cant do taht, marker is already placed there
        } else {

            if (activePlayer == 1) {
                //Place X for player one
                cell.querySelector(".X").classList.toggle("inactive");
            } else {
                cell.querySelector(".O").classList.toggle("inactive");
            };

            // Disable the cell
            cell.classList.toggle("placed");

            // Change active player after placing marker
            controller.changeActivePlayer();
        };
        
    };

    //delete marker function
    return {placeMarker}
})();

const createPlayer = () => {
    let playerCells = []

    const checkWinCondition = () => {

    }
}