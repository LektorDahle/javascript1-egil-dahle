import { MyElement, divider, paragraph, image, anchor, header } from "../html-elements.js";


export function mainPage() {
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
        this.renderFilters();
        this.renderJackets();

    }

    renderFilters() {
        this.aside = document.createElement("aside");
        header(this.aside, "h2", "Filters: ");
        this.createCheckbox("Male:", "Male");
        this.createCheckbox("Female:", "Female");
        this.createCheckbox("On sale:", "onSale");
        this.createCheckbox("Favorite:", "favorite");
        this.main.appendChild(this.aside);
    }
    /**
     * 
     * @param {string} name 
     * @param {string} toFilter
     */
    createCheckbox(name, toFilter) {
        if (!this.aside) return;
        const div = divider(this.aside);
        header(div, "h2", name);
        const check = document.createElement("input");
        check.type = "checkbox";
        check.classList.add("filter-checkbox");
        div.append = check;
        check.checked = JSON.parse(localStorage.getItem("filters") || "[]").includes(toFilter);
        check.addEventListener("change", () => {
            if (check.checked) {
                const savedFilters = JSON.parse(localStorage.getItem("filters") || "[]");
                if (!savedFilters.includes(toFilter)) {
                    localStorage.setItem("filters", JSON.stringify([...savedFilters, toFilter]));
                }
            } else {
                /** @type {string[]} */
                const savedFilters = JSON.parse(localStorage.getItem("filters") || "[]");
                localStorage.setItem(
                    "filters",
                    JSON.stringify(savedFilters.filter((filterName) => filterName !== toFilter))
                );
            }
            this.main.innerHTML = "";
            this.renderFilters();
            this.renderJackets();
        });
    }

    async renderJackets() {
        const allData = await this.getAllData();
        /** @type {string[]} */
        const activeFilters = JSON.parse(localStorage.getItem("filters") || "[]");
        const favorites = JSON.parse(localStorage.getItem("likedList") || "[]");
        allData.data.forEach((/**@type {*} */data) => {
            if (activeFilters.includes("Male") && data.gender == "Male") {
                this.makeJacketCard(data)
            }
            else if (activeFilters.includes("Female") && data.gender == "Female") {
                this.makeJacketCard(data)
            }
            else if (activeFilters.includes("onSale") && data.onSale == true) {
                this.makeJacketCard(data)
            }
            else if (activeFilters.includes("favorite") && favorites.includes(data.id)) {
                this.makeJacketCard(data)
            }
        })
    }

    /**
     * 
     * @param {*} data 
     */
    makeJacketCard(data) {
        const contentWrapper = anchor(this.main, `./javascript1-egil-dahle/#jacket/` + String(data.id));
        contentWrapper.class = "content-short";
        header(contentWrapper, "h1", data.title.replace("Rainy Days", ""))
        image(contentWrapper, data.image.url, data.image.alt);
        const text = divider(contentWrapper);
        text.element.innerHTML = "BUY";
        text.class = "button-style-main";
        if (data.onSale) {
            const price = paragraph(contentWrapper, "£" + data.price);
            price.class = "price";
            price.strikeThrough();
            const salePrice = paragraph(contentWrapper, "SALE: £" + data.discountedPrice);
            salePrice.class = "onSale";
        }
        else {
            const price = paragraph(contentWrapper, "£" + data.price);
            price.class = "price";
        }

        const likedList = JSON.parse(localStorage.getItem("likedList") || "[]");
        const unLikedList = JSON.parse(localStorage.getItem("unLikedList") || "[]");
        const like = new LikeButton(contentWrapper, data.id);
        const id = String(data.id);

        if (likedList.includes(id)) {
            like.redHeart();
        } else if (unLikedList.includes(id)) {
            like.grayHeart();
        } else if (data.favorite) {
            like.like();
        } else {
            if (!unLikedList.includes(id)) {
                localStorage.setItem("unLikedList", JSON.stringify([...unLikedList, id]));
            }
        }
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
        throw (err)
    }
}


export class LikeButton {
    /**
     * 
     * @param {MyElement} parent
     * @param {string} jacketId
     */
    constructor(parent, jacketId) {
        this.image = document.createElement("img");
        this.image.src =  "./img/icons/heart-unfilled.svg";
        this.liked = false;
        const likeButton = document.createElement("button");
        likeButton.appendChild(this.image);
        parent.append = likeButton;
        likeButton.classList.add("like-button");
        this.jacketId = jacketId;
        likeButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (this.liked) {
                this.unlike();
            } else {
                this.like();
            }
        });
    }
    like() {
        this.redHeart()
        const likedList = JSON.parse(localStorage.getItem("likedList") || "[]");
        if (likedList.includes(this.jacketId)) return;
        localStorage.setItem("likedList", JSON.stringify([...likedList, this.jacketId]));
        /** @type {string[]} */
        const unLikedList = JSON.parse(localStorage.getItem("unLikedList") || "[]");
        localStorage.setItem("unLikedList", JSON.stringify(unLikedList.filter((id) => id !== this.jacketId)));
    }
    redHeart() {
        this.liked = true;
        this.image.src = "./img/icons/heart-filled.svg";
    }
    unlike() {
        this.grayHeart()
        /** @type {string[]} */
        const likedList = JSON.parse(localStorage.getItem("likedList") || "[]");
        localStorage.setItem("likedList", JSON.stringify(likedList.filter((likedId) => likedId !== this.jacketId)));

        /** @type {string[]} */
        const unLikedList = JSON.parse(localStorage.getItem("unLikedList") || "[]");
        if (!unLikedList.includes(this.jacketId)) {
            localStorage.setItem("unLikedList", JSON.stringify([...unLikedList, this.jacketId]));
        }
    }
    grayHeart() {
        this.liked = false;
        this.image.src = "./img/icons/heart-unfilled.svg";
    }
}