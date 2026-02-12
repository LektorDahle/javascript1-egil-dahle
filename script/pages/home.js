export function mainPage() {
    window.location.hash = "mainpage"; // const screen = location.hash.slice(1); reads the url
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    main.textContent = "Yo";
}

export class MainContentPage{

}