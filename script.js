
const gameboard = (() => {

    let arrayFields = ["", "", "", "", "", "", "", "", ""];
    let domFields = document.querySelectorAll(".field");

    function renderFields() {
        for (f in arrayFields) {
            domFields[f].textContent = arrayFields[f]; 
        }
    };

    function updateArray(element, sign) {
        let index = element.getAttribute("data-index");
        arrayFields[index] = sign;
    };

    function removeEventListeners() {

        // remove event listeners by cloning nodes
        domFields.forEach( e => {
            let eClone = e.cloneNode(true);
            e.parentNode.replaceChild(eClone, e)
        })
    };

    function resetGameboard() {
        
        domFields.forEach(element => updateArray(element, ""))
        renderFields()
    }

    return {
        arrayFields,
        domFields,
        renderFields,
        updateArray,
        removeEventListeners,
        resetGameboard
    };
})();



const game = (() => {

    let _currentPlayer = "X";
    let winner;

    function _toggleCurrentPlayer() {
        _currentPlayer = (_currentPlayer == "X") ? "O" : "X"  
    };

    function resetCurrentPlayer() {
        _currentPlayer = "X"        
    }

    function checkIfWon() {

        let winningBoard = [[0, 3, 6],[1, 4, 7],[2, 5, 8],  // vertical win
                            [0, 1, 2],[3, 4, 5],[6, 7, 8],  // horizontal win
                            [0, 4, 8],[2, 4, 6],]           // diognal win

        for (i in winningBoard) {
            let numOne = winningBoard[i][0];
            let numTwo = winningBoard[i][1];
            let numThree = winningBoard[i][2];

            if ((gameboard.arrayFields[numOne] == gameboard.arrayFields[numTwo]) &&
                (gameboard.arrayFields[numOne] == gameboard.arrayFields[numThree]) &&
                (gameboard.arrayFields[numOne])) {
                    winner = gameboard.arrayFields[numOne];
                    return winner
                }
        }
    }

    function playRound() {
        gameboard.domFields.forEach(element => {

            element.addEventListener("click", () => {

                // skip already checked fields
                if (element.textContent) {
                    return
                } else {
                    gameboard.updateArray(element, _currentPlayer)
                    gameboard.renderFields()
                    _toggleCurrentPlayer()
                    displayLogic.displayNextPlayer(_currentPlayer)
                }
                
                let winner = game.checkIfWon()
                if (winner) {
                    _toggleCurrentPlayer()
                    displayLogic.displayWinner(_currentPlayer)
                    gameboard.removeEventListeners()
                }
            })
        });
    };

    function resetGame() {
        
        let domReset = document.querySelector(".reset-button");

        domReset.addEventListener("click", () => {
            displayLogic.resetDisplay()
            gameboard.resetGameboard()
            resetCurrentPlayer()
        })
    }

    function playGame() {
        //if (!hasWon)

        playRound()
        resetGame()

    }

    return {
        playGame,
        playRound,
        checkIfWon,
        winner
    }

})();

const displayLogic = (() => {

    let _domDisplay = document.getElementById("display")

    function resetDisplay() {
        _domDisplay.textContent = "Game is reset!\n X starts the Game!"
    }

    function displayWinner(winnerSign) {
        _domDisplay.textContent = `Game is over! ${winnerSign} has won the Game!`
    }

    function displayNextPlayer(nextPlayer) {
        _domDisplay.textContent = `It´s ${nextPlayer}´s turn!`
    }


    return {
        displayWinner,
        displayNextPlayer,
        resetDisplay
    }

})();


game.playGame()


