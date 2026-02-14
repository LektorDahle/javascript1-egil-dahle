import { makeHeaderAndFooter } from "./header-footer.js";
//import { Head } from "./head.js";
import { mainPage } from "./pages/home.js"
import { sizesPage } from "./pages/sizes.js"

/**
 * 
 * @param {string} screen 
 */
export function selectScreen(screen) {
    localStorage.setItem("screen", screen);
    history.pushState({ screen }, "", "");
    setScreen(screen);
}

/**
 * 
 * @param {string} screen 
 */
function setScreen(screen) {
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
    render()
    const screen = localStorage.getItem("screen");
    if (screen) {
        window.history.replaceState({ screen }, "", "");
        setScreen(screen);
    }
    else {
        setScreen("frontScreen");
    }
});

window.addEventListener("popstate", (event) => {
    const screen = event.state?.screen || "frontScreen";
    localStorage.setItem("screen", screen);
    setScreen(screen);
});

export function render() {
    makeHeaderAndFooter();
    //new Head();
}
