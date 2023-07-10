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

    function renderFields() {
        for (f in fields) {
            domFields[f].textContent = fields[f]
        }
    };

    return {
        arrayFields,
        domFields,
        renderFields
    };
})();

const Player = (sign) => {
    const getSign = () => sign;

    const makeMove = () => {
        gameboard.domFields.forEach(element => {

            if (element.textContent) {
                return
            } else {
                element.addEventListener("click", () => {
                    element.textContent = sign;
                })
            }
        });
    };

    return {
        getSign,
        makeMove,
    }
};



const xPlayer = Player("X");
const yPlayer = Player("Y");


xPlayer.makeMove()
yPlayer.makeMove()
