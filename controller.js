import * as model from "./model.js";
import * as view from "./view.js";

init();

function init() {
    console.log("Controller initialized");
    model.init();
    view.init();
}
