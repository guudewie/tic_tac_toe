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
        for (f in arrayFields) {
            domFields[f].textContent = arrayFields[f]
        }
    };
    
    //remove event listener by cloning node and replacing it
    function removeEventListeners() {

        domFields.forEach( e => {
            
            let eClone = e.cloneNode(true);
            e.parentNode.replaceChild(eClone, e)
        })
    };

    function updateArray(element, sign) {
        let index = element.getAttribute("data-index");

        arrayFields[index] = sign;

        console.log(arrayFields)

    }

    return {
        arrayFields,
        domFields,
        renderFields,
        removeEventListeners,
        updateArray
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
                    gameboard.updateArray(element, sign)
                    gameboard.renderFields()
                    gameboard.removeEventListeners()
                    
                })
            };
        });
    };

    return {
        getSign,
        makeMove,
    }
};

/*
const game = (() => {

    const xPlayer = Player("X");
    const yPlayer = Player("Y");

    function playGame() {
        //if (!hasWon)
        xPlayer.makeMove()
        //await move
        yPlayer.makeMove()
        //await move
    }

    return {
        playGame
    }

})();
*/


const xPlayer = Player("X");
const yPlayer = Player("Y");

xPlayer.makeMove()