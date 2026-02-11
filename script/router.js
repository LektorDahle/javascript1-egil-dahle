import { LoginScreen } from "./loginScreen.js";
import { NewUserScreen } from "./newUserScreen.js";
import { MainPage } from "./mainpage.js";
function visSkjerm(skjerm) {
    switch (skjerm) {
        case "login":
            new LoginScreen().render();
            break;
        case "ny-bruker":
            new NewUserScreen().render();
            break;
        case "hovedside":
            new MainPage().render();
            break;
        default:
            new LoginScreen().render();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const skjerm = localStorage.getItem("skjerm");
    if (skjerm) {
        window.history.replaceState({ skjerm }, "", "");
        visSkjerm(skjerm);
    }
    else {
        visSkjerm("login");
    }
});
window.addEventListener("popstate", (e) => {
    const skjerm = e.state?.skjerm || "login";
    localStorage.setItem("skjerm", skjerm);
    visSkjerm(skjerm);
});
