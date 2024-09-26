import * as controller from "./controller.js";

export { init, createVisulGrid };

function init() {
    console.log("View initialized");
}

function createVisulGrid(model) {
    const visualGrid = document.querySelector("#grid-container");
    visualGrid.innerHTML = "";

    // opdatere css #grid-container template rows/cols
    document.documentElement.style.setProperty("--grid-rows", model.rows);
    document.documentElement.style.setProperty("--grid-cols", model.cols);

    for (let row = 0; row < model.rows; row++) {
        console.log("new row");
        for (let col = 0; col < model.cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            visualGrid.insertAdjacentElement("beforeend", cell);
        }
    }
}
