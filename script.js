/*

MODULE 
 - gamboard
 - displayController

FACTORIES
 - players

*/

const gameboard = (() => {

    let fields = ["X", "X", "X", "O", "O", "O", "X", "X", "X"];
    let _domFields = document.querySelectorAll(".field");

    function renderFields() {
        for (f in fields) {
            _domFields[f].textContent = fields[f]
        }
    };

    return {
        fields,
        _domFields,
        renderFields
    };
})();


console.log(gameboard.renderFields())



