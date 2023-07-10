/*

MODULE 
 - gamboard
 - displayController

FACTORIES
 - players


FUNCTIONS I generally need

 - render board
 - add event listeners
    - check if field is full already
 - check if someone won
 - display win message
 - start game
 - reset game

*/


const gameboard = (() => {

    let arrayFields = ["", "", "", "", "", "", "", "", ""];
    let domFields = document.querySelectorAll(".field");
    let currentPlayer = "X";

    function renderFields() {
        for (f in arrayFields) {
            domFields[f].textContent = arrayFields[f]
        }
    };

    function updateArray(element, sign) {
        let index = element.getAttribute("data-index");

        arrayFields[index] = sign;

        console.log(arrayFields)
    };

    function _toggleCurrentPlayer() {
        if (currentPlayer == "X") {
            currentPlayer = "O"
        } else {
            currentPlayer = "X"
        }
    };

    function playRound() {
        domFields.forEach(element => {

            element.addEventListener("click", () => {

                if (element.textContent) {
                    return
                } else {
                gameboard.updateArray(element, currentPlayer)
                gameboard.renderFields()
                _toggleCurrentPlayer()
                }
                
                if (game.checkIfWon()) {
                    console.log("Game is over!", game.checkIfWon(), " has won the Game!")
                }
            })
        });
    };

    return {
        arrayFields,
        domFields,
        renderFields,
        updateArray,
        playRound
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
    let winner;

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

    function playGame() {
        //if (!hasWon)

        gameboard.playRound()

    }

    return {
        playGame,
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