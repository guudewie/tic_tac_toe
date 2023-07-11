/*

TO - DO

start
restart
display winner
display current player
evt. highlight winning move
rewrite _toggleCurrentPlayer to be as "  X ? 0 : 1  "


logic ->    start game
            make moves
            display winner
            start game




*/


const gameboard = (() => {

    let arrayFields = ["", "", "", "", "", "", "", "", ""];
    let domFields = document.querySelectorAll(".field");

    function renderFields() {
        for (f in arrayFields) {
            domFields[f].textContent = arrayFields[f]
        }
    };

    function updateArray(element, sign) {
        let index = element.getAttribute("data-index");
        arrayFields[index] = sign;
    };

    function removeEventListeners() {

        domFields.forEach( e => {

            let eClone = e.cloneNode(true);
            e.parentNode.replaceChild(eClone, e)
        })
    };

    return {
        arrayFields,
        domFields,
        renderFields,
        updateArray,
        removeEventListeners
    };
})();


const Player = (sign) => {
    const getSign = () => sign;

    return {
        getSign
    }
};


const game = (() => {

    const xPlayer = Player("X");
    const yPlayer = Player("Y");
    let _currentPlayer = "X";
    let winner;

    function _toggleCurrentPlayer() {
        _currentPlayer = (_currentPlayer == "X") ? "O" : "X"  
    };

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
                }
                
                let winner = game.checkIfWon()
                if (winner) {
                    console.log("Game is over!", winner, " has won the Game!")
                    gameboard.removeEventListeners()
                }
            })
        });
    };

    function playGame() {
        //if (!hasWon)

        playRound()

    }

    return {
        playGame,
        playRound,
        checkIfWon,
        winner
    }

})();

game.playGame()



/*

// vertical win
(gameboard.arrayFields[0] === 
    gameboard.arrayFields[3] ===
    gameboard.arrayFields[6] ===) ||
    
    (gameboard.arrayFields[1] === 
    gameboard.arrayFields[4] ===
    gameboard.arrayFields[7] ===)  ||
    
    (gameboard.arrayFields[2] === 
    gameboard.arrayFields[5] ===
    gameboard.arrayFields[8] ===)  ||
    
    // horizontal win
    (gameboard.arrayFields[0] === 
    gameboard.arrayFields[1] ===
    gameboard.arrayFields[2] ===)  ||
    
    (gameboard.arrayFields[3] === 
    gameboard.arrayFields[4] ===
    gameboard.arrayFields[5] ===)  ||
    
    (gameboard.arrayFields[6] === 
    gameboard.arrayFields[7] ===
    gameboard.arrayFields[8] ===)  ||
    
    // diogonal win
    (gameboard.arrayFields[0] === 
    gameboard.arrayFields[4] ===
    gameboard.arrayFields[8] ===)  ||
    
    (gameboard.arrayFields[2] === 
    gameboard.arrayFields[4] ===
    gameboard.arrayFields[6] ===) 

[   "O", "", "",
    "O", "", "",
    "O", "", ""  ]
[   "", "O", "",
    "", "O", "",
    "", "O", ""  ]
[   "", "", "O",
    "", "", "O",
    "", "", "O"  ]

[   "O", "O", "O",
    "", "", "",
    "", "", ""  ]
[   "", "", "",
    "O", "O", "O",
    "", "", ""  ]
[   "", "", "",
    "", "", "",
    "O", "O", "O"  ]

[   "O", "", "",
    "", "O", "",
    "", "", "O"  ]

[   "", "", "O",
    "", "O", "",
    "O", "", ""  ]

*/