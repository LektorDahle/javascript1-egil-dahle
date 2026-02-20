import { divider, paragraph } from "../html-elements.js";


export function mainPage() {
    window.location.hash = "mainpage"; // const screen = location.hash.slice(1); reads the url
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    new MainContentPage(main);
}

export class MainContentPage {
    /**
     * 
     * @param {HTMLElement} main 
     */
    constructor(main) {
        this.main = main;
        this.renderJackets();

    }

    async renderJackets() {
        const allData = await this.getAllData();
        this.main.innerHTML = JSON.stringify(allData);
    }

    async getAllData() {
        try {
            const res = await fetch("https://v2.api.noroff.dev/rainy-days");
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        } catch (err) {
            this.showErrorOnScreen(err);
            throw err;
        }
    }

    /**
     * 
     * @param {*} err 
     */
    showErrorOnScreen(err) {
        const errorDiv = divider(this.main);
        paragraph(errorDiv, err);
    }
}
