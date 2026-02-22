import { MyElement, divider, paragraph, header, image } from "../html-elements.js";
import { LikeButton } from "./home.js";


/**
 * 
 * @param {string} id 
 */
export function jacketPage(id) {
    const main = document.getElementsByTagName("main")[0] || alert("Could not render page!");
    new Page(main, id)
}
export class Page {
    /**
     * 
     * @param {HTMLElement} parent 
     * @param {string} id
     */
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.renderJacket()
    }

    async renderJacket() {
        const jacketData = await this.getJacket();
        const jacketWrapper = divider(this.parent);
        const topDiv = divider(jacketWrapper);
        topDiv.class = "jacket-title-div"
        const middleDiv = divider(jacketWrapper);
        middleDiv.class = "jacket-content-div"
        const bottomDiv = divider(jacketWrapper);

        jacketWrapper.class = "jacket-wrapper";
        header(topDiv, "h1", jacketData.data.title);
        image(middleDiv, jacketData.data.image.url, jacketData.data.image.alt)
        paragraph(middleDiv, jacketData.data.description);

        new BasketButton(bottomDiv, jacketData.data.id);

        if (jacketData.data.onSale) {
            const price = paragraph(bottomDiv, "£" + jacketData.data.price);
            price.class = "price";
            price.strikeThrough();
            const salePrice = paragraph(bottomDiv, "SALE: £" + jacketData.data.discountedPrice);
            salePrice.class = "onSale";
        }
        else {
            const price = paragraph(bottomDiv, "£" + jacketData.data.price);
            price.class = "price";
        }
        const likedList = JSON.parse(localStorage.getItem("likedList") || "[]");
        const unLikedList = JSON.parse(localStorage.getItem("unLikedList") || "[]");
        const like = new LikeButton(bottomDiv, jacketData.data.id);
        const id = String(jacketData.data.id);

        if (likedList.includes(id)) {
            like.redHeart();
        } else if (unLikedList.includes(id)) {
            like.grayHeart();
        } else if (jacketData.data.favorite) {
            like.like();
        } else {
            if (!unLikedList.includes(id)) {
                localStorage.setItem("unLikedList", JSON.stringify([...unLikedList, id]));
            }
        }

    }



    async getJacket() {
        try {
            const res = await fetch("https://v2.api.noroff.dev/rainy-days/" + this.id);
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
        const errorDiv = divider(this.parent);
        const errorText = "We ran into som bad weather and are unable to show you our cool jacket. Please try again later."
        const theError = paragraph(errorDiv, errorText);
        theError.element.style.color = "red";
        theError.element.style.fontSize = "3rem";
        theError.element.style.textAlign = "center";
        throw (err)
    }
}

class BasketButton {
    /**
     * 
     * @param {HTMLElement | MyElement} parent 
     * @param {string} id
     */
    constructor(parent, id) {
        this.button = header(parent, "h1", "ADD TO BASKET");
        this.button.class = "button-style-main";
        this.id = id;

    }

    addToBasket(){
         const basket = JSON.parse(localStorage.getItem("basket") || "[]");
         localStorage.setItem("basket", JSON.stringify([...basket, this.id]));
    }
}