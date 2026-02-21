import { makeHeaderAndFooter } from "./header-footer.js";
//import { Head } from "./head.js";
import { mainPage } from "./pages/home.js"
import { sizesPage } from "./pages/sizes.js"
import { jacketPage } from "./pages/jacket.js"

/**
 * 
 * @param {string} screen 
 */
export function selectScreen(screen) {
    history.replaceState({ screen }, "", window.location.pathname + window.location.search);
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
    main.id = "";
    main.innerHTML = ""
    switch (screen) {
        case "frontScreen":
            mainPage()
            break;
        case "sizeScreen":
            sizesPage()
            break;
        case "jacket":
            jacketPage()
            break;
        case "shipping":
            jacketPage()
            break;
        case "about":
            jacketPage()
            break;
        case "cart":
            jacketPage()
            break;
        default:
            mainPage();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    makeHeaderAndFooter();
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
    let screen = event.state?.screen;
    if (!screen) {
        if (window.location.hash) {
            screen = localStorage.getItem("screen") || "frontScreen";
        } else {
            screen = "frontScreen";
        }
    }
    localStorage.setItem("screen", screen);
    setScreen(screen);
});