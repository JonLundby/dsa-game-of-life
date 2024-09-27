import Grid from "./model.js";
import * as view from "./view.js";

export { handleCellClick };

let GRID_HEIGHT = 20;
let GRID_WIDTH = 20;
let model;
let generation = 0;
let intervalId;

init();

function init() {
    // event listeners til kontrol knapper
    document.querySelector("#start-btn").addEventListener("click", startGame);
    document.querySelector("#random-cells-btn").addEventListener("click", addRandomCells);
    document.querySelector("#clear-cells-btn").addEventListener("click", clearAllCells);
    document.querySelector("#stop-btn").addEventListener("click", stopGame);
    document.querySelector("#row-size-input").addEventListener("change", resizeGrid);
    document.querySelector("#column-size-input").addEventListener("change", resizeGrid);
    
    // gem stop knap
    document.querySelector("#stop-btn").classList.add("hidden");
    
    // defaul grid og model
    view.createVisualGrid(GRID_HEIGHT, GRID_WIDTH);
    model = new Grid(GRID_HEIGHT, GRID_WIDTH, 0);

    console.table(model.grid);
}

function startGame() {
    
    toggleControlPanel();

    intervalId = setInterval(() => {
        nextGeneration();
        view.updateVisualGrid(model);
        generation++;
        document.querySelector("#generation").textContent = generation;
        console.table(model.grid);
    }, 1200);
}

// beregner nyt grid ud fra eksisterende grid og opdaterer model
function nextGeneration() {
    const newGrid = new Grid(GRID_HEIGHT, GRID_WIDTH, 0);

    for (let row = 0; row < GRID_HEIGHT; row++) { 
        for (let col = 0; col < GRID_WIDTH; col++) {
            
            const cellValue = model.get(row, col);
            const neighbourCells = model.neighbourValues(row, col);
            const neighboursAlive = neighbourCells.filter((value) => value === 1).length;

            if (cellValue === 0 && neighboursAlive === 3) {
                newGrid.set(row, col, 1);
            } else if (cellValue === 1 && (neighboursAlive === 2 || neighboursAlive === 3)) {
                newGrid.set(row, col, 1);
            } else {
                newGrid.set(row, col, 0);
            }
        }
    }

    model = newGrid;
    view.updateVisualGrid(model);
}

function handleCellClick(event) {
    const cell = event.target;

    let cellValue = model.get(cell.dataset.row, cell.dataset.col);

    if (cellValue === 0) {
        model.set(cell.dataset.row, cell.dataset.col, 1);
    } else {
        model.set(cell.dataset.row, cell.dataset.col, 0);
    }

    cellValue = model.get(cell.dataset.row, cell.dataset.col);
    view.updateVisualCell(cell, cellValue);
}

function addRandomCells() {
    for (let row = 0; row < model.rows; row++) {
        for (let col = 0; col < model.cols; col++) {
            if (Math.random() < 0.15) {
                model.set(row, col, 1);
                view.updateVisualGrid(model);
            }
        }
    }
    console.table(model.grid);
}

function stopGame() {
    if (intervalId) {
        clearInterval(intervalId);
    };
    toggleControlPanel();
}

function resizeGrid() {
    GRID_HEIGHT = parseInt(document.querySelector("#row-size-input").value);
    GRID_WIDTH = parseInt(document.querySelector("#column-size-input").value);

    model = new Grid(GRID_HEIGHT, GRID_WIDTH, 0);
    view.createVisualGrid(GRID_HEIGHT, GRID_WIDTH);
}

function clearAllCells() {
    model.fill(0);
    view.updateVisualGrid(model);
    generation = 0;
    document.querySelector("#generation").textContent = generation;
}

function toggleControlPanel() {
    if (document.querySelector("#start-btn").classList.contains("hidden")) {
        document.querySelector("#start-btn").classList.remove("hidden");
        document.querySelector("#stop-btn").classList.add("hidden");
        document.querySelector("#row-size-input").disabled = false;
        document.querySelector("#column-size-input").disabled = false;
    } else {
        document.querySelector("#start-btn").classList.add("hidden");
        document.querySelector("#stop-btn").classList.remove("hidden");
        // frys input felter så de ikke kan ændres imens livet lever og toggle start/stop knapper
        document.querySelector("#row-size-input").disabled = true;
        document.querySelector("#column-size-input").disabled = true;
    }
}