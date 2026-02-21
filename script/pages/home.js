import { divider, paragraph, image, anchor } from "../html-elements.js";


export function mainPage() {
    //window.location.hash = "mainpage"; // const screen = location.hash.slice(1); reads the url
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
        this.main.id = "content";
        this.renderJackets();

    }

    async renderJackets() {
        const allData = await this.getAllData();
        allData.data.forEach((/**@type {object} */d) => {
            this.makeJacketCard(d)
        })
    }

    /**
     * 
     * @param {*} data 
     */
    makeJacketCard(data) {
        const contentWrapper = anchor(this.main, "/jacket/#" + String(data.id));
        contentWrapper.class = "content-short";
        image(contentWrapper, data.image.url, data.image.alt)
        const text = divider(contentWrapper);
        text.element.innerHTML = "ADD TO CART"
        text.class = "button-style-main"
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
        const errorText = "We ran into som bad weather and are unable to show you any of our cool jackets. Please try again later."
        const theError = paragraph(errorDiv, errorText);
        theError.element.style.color = "red";
        theError.element.style.fontSize = "3rem";
        theError.element.style.textAlign = "center";
        throw(err)
    }
}
