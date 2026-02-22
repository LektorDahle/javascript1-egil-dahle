
export function cartPage() {
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    new Page(main);
}

class Page {
    /**
     * 
     * @param {HTMLElement} main 
     */
    constructor(main) {
        this.main = main;
        this.main.id = "content";
    }
}