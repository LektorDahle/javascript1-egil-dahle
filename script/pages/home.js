
export function mainPage() {
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    main.textContent = "Yo";
}