import { makeHeaderAndFooter } from "./header-footer.js";
import { Head } from "./head.js";

/**
 * 
 * @param {string} screen 
 */
export function selectScreen(screen) {
    switch (screen) {
        case "sizesScreen":
            //
            break;
        case "itemScreen":
            //
            break;
        case "frontScreen":
            //
            break;
        default:
            //frontScreen
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const screen = localStorage.getItem("screen");
    if (screen) {
        window.history.replaceState({ screen }, "", "");
        selectScreen(screen);
    }
    else {
        selectScreen("frontScreen");
    }
});
window.addEventListener("popstate", (event) => {
    const screen = event.state?.screen || "frontScreen";
    localStorage.setItem("skjerm", screen);
    selectScreen(screen);
});


export function render() {
    makeHeaderAndFooter();
    new Head();
}
document.addEventListener("DOMContentLoaded", render);