import { makeHeaderAndFooter } from "./header-footer.js";
import { Head } from "./head.js";
import { mainPage } from "./pages/home.js"
import { sizesPage } from "./pages/sizes.js"

/**
 * 
 * @param {string} screen 
 */
export function selectScreen(screen) {
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    main.innerHTML = ""
    switch (screen) {
        case "frontScreen":
            mainPage()
            break;
        case "sizesScreen":
            sizesPage()
            break;
        case "stuffScreen":
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