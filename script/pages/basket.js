import { MyElement, divider, paragraph, image, header } from "../html-elements.js";

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
        this.price = 0;
        this.addItemToCart()
    }

    async addItemToCart() {
        const allData = await this.getAllData();
        const basket = JSON.parse(localStorage.getItem("basket") || "[]");
        const cartWrapper = divider(this.main);
        allData.data.forEach((/**@type {*} */data) => {
            if (basket.includes(data.id)) {
                this.price += data.discountedPrice;
                this.renderItemInCart(cartWrapper, data.image.url, data.image.alt, data.title, data.price);
            }
        })
        const priceSum = divider(cartWrapper);
        priceSum.element.style.borderTop = "2px solid black";
        priceSum.element.style.borderBottom = "2px solid black";
        header(priceSum, "h2", "TOTAL: £" + String(this.price));

        const buyButton = document.createElement("button");
        buyButton.textContent = "BUY JACKETS";
        buyButton.classList.add("button-style-main")
        cartWrapper.append = buyButton;
        buyButton.onclick = () => {
            this.main.innerHTML = "";
            const art = document.createElement("article");
            this.main.appendChild(art);
            const confirmation = paragraph(art, "Thank you for buying jackets at Rainy Days!");
            confirmation.element.style.color = "red";
            confirmation.element.style.fontSize = "3rem";
            confirmation.element.style.textAlign = "center";
        }
    }

    /**
     * 
     * @param {MyElement} parent 
     * @param {string} url 
     * @param {string} alt 
     * @param {string} title 
     * @param {string} price 
     */
    renderItemInCart(parent, url, alt, title, price) {
        const cartItem = divider(parent)
        cartItem.class = "cart-item"
        header(parent, "h1", title)
        const img = image(parent, url, alt);
        img.class = "cart-image"
        paragraph(parent, "£" + String(price));
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
        const errorText = "We ran into som bad weather and are unable to show you your cart. Please try again later."
        const theError = paragraph(errorDiv, errorText);
        theError.element.style.color = "red";
        theError.element.style.fontSize = "3rem";
        theError.element.style.textAlign = "center";
        throw (err)
    }
}