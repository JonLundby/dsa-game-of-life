import * as controller from "./controller.js";

export { init, createVisualGrid, updateVisualCell, updateVisualGrid };

function init() {
    // console.log("View initialized");
}

function createVisualGrid(rows, cols) {
    const visualGrid = document.querySelector("#grid-container");
    visualGrid.innerHTML = "";

    // opdatere css #grid-container template rows/cols
    document.documentElement.style.setProperty("--grid-rows", rows);
    document.documentElement.style.setProperty("--grid-cols", cols);

    // bygger grided med celler og "tilbehør"
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.classList.add("cell");
            cell.addEventListener("click", controller.handleCellClick);
            visualGrid.insertAdjacentElement("beforeend", cell);
        }
    }
}

function updateVisualGrid(model) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const value = model.get(row, col);
        updateVisualCell(cell, value);
    });
}

function updateVisualCell(cell, value) {
    if (value === 0) {
        cell.style.backgroundColor = "white";
    } else {
        cell.style.backgroundColor = "black";
    }
}
