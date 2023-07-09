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

    let fields = ["", "", "", "", "", "", "", "", ""];
    let domFields = document.querySelectorAll(".field");

    function renderFields() {
        for (f in fields) {
            domFields[f].textContent = fields[f]
        }
    };

    return {
        fields,
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


gameboard.renderFields();

const xPlayer = Player("X");

console.log(xPlayer.getSign())
console.log(xPlayer.makeMove())


