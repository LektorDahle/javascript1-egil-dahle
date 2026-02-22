import { makeHeaderAndFooter } from "./header-footer.js";
import { mainPage } from "./pages/home.js"
import { jacketPage } from "./pages/jacket.js"
import { cartPage } from "./pages/basket.js";

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
    const hash = window.location.hash.slice(1);
    if (hash) {
        if (hash.startsWith("jacket/")) {
            const id = hash.split("/")[1];
            jacketPage(id);
            return;
        }
    } else
        switch (screen) {
            case "frontScreen":
                mainPage()
                break;
            case "about":
                //jacketPage()
                break;
            case "cart":
                cartPage()
                break;
            default:
                mainPage();
        }
}



document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("likedList")) {
        localStorage.setItem("likedList", "[]")
    }
    if (!localStorage.getItem("unLikedList")) {
        localStorage.setItem("unLikedList", "[]")
    }
    if (!localStorage.getItem("filters")) {
        localStorage.setItem("filters", JSON.stringify(["Male", "Female"]));
    }
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