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

    function removeEventListeners() {

        domFields.forEach( e => {
            
            let eClone = e.cloneNode(true);
            e.parentNode.replaceChild(eClone, e)
            console.log(e.parentNode)
        })
    };

    return {
        arrayFields,
        domFields,
        renderFields,
        removeEventListeners
    };
})();

const Player = (sign) => {
    const getSign = () => sign;

    //remove event listener by cloning node and replacing it
    const makeMove = () => {
        gameboard.domFields.forEach(element => {

            if (element.textContent) {
                return
            } else {
                element.addEventListener("click", () => {
                    element.textContent = sign;
                })
            };
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
