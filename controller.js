import Grid from "./model.js";
import * as view from "./view.js";

let GRID_HEIGHT = 10;
let GRID_WIDTH = 10;

init();

function init() {
    console.log("Controller initialized");
    view.init();

    document.querySelector("#start-btn").addEventListener("click", startGame);
    
}

function startGame() {
    GRID_HEIGHT = parseInt(document.querySelector("#row-size-input").value);
    GRID_WIDTH = parseInt(document.querySelector("#column-size-input").value);

    console.log(`Game starting!\ngrid height: ${GRID_HEIGHT}\ngrid width: ${GRID_WIDTH}`);
    
    const model = new Grid(GRID_HEIGHT, GRID_WIDTH, 1);
    console.table(model.grid)
    
    view.createVisulGrid(model)
}

