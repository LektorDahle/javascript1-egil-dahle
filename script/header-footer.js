import { getBrowserColor } from "./main.js"
import { anchor, divider } from "./html-elements.js";

class Body {
    /**
      * @param {string} tag
      */
    constructor(tag) {
        this.body = document.body;
        this.create = document.createElement.bind(document);
        this.mainElement = this.create(tag)
    }
}

export class Header extends Body {
    /**
     * Creates and handles the header of the body
     */
    constructor() {
        super("header")
        this.body.prepend(this.mainElement);
        this.addLogo()

        const nav = this.create("nav");
        nav.classList.add("nav-wrapper");
        this.mainElement.appendChild(nav);

        const ul = this.create("ul");
        this.mainElement.appendChild(nav);
        nav.appendChild(ul);

        this.addLI(ul, "./content-overview", "Jackets")
        this.addLI(ul, "./sizes", "Size Guide")
        this.addLI(ul, "./about-us", "Information")
        this.addLI(ul, "../payment", "Cart")

        this.addThemeButton();

        /** 
         * @todo 
         * Update hamburger with JS
         * Currently it is not dissapering when screen size is changed, so that yoy
         */
        const hamburgerDiv = divider(this.mainElement);
        hamburgerDiv.id = "hamburger-menu";

        const hamburgerInput = this.create("input");
        hamburgerInput.id = "navigation-menu-wrapper";
        hamburgerInput.type = "checkbox";
        hamburgerDiv.append = hamburgerInput;

        const hamburgerImgLight = this.create("img");
        hamburgerImgLight.classList.add("light-theme");
        const hamburgerImgDark = this.create("img");
        hamburgerImgDark.classList.add("dark-theme");
        hamburgerDiv.appendList(hamburgerImgLight, hamburgerImgDark);

        hamburgerImgLight.src = "./img/icons/hamburger-lightmode.svg";
        hamburgerImgDark.src = "./img/icons/hamburger-darkmode.svg";
    }

    /**
     * Adds (prepends) the logo image to the header
     */
    addLogo() {
        const logoWrapper = divider(this.mainElement);
        const logoLink = anchor(logoWrapper, "./");
        logoWrapper.class = "logo-wrapper";
        logoLink.class = "logo";

        const logoImageDark = this.create("img");
        const logoImageLight = this.create("img");
        logoLink.appendList(logoImageDark, logoImageLight);

        //Adding dark and light theme logos to the document, so that
        //the "old" system of using CSS to change color theme will work.
        logoImageDark.src = "./img/icons/RD-logo-darkmode.svg";
        logoImageDark.classList.add("dark-theme");
        logoImageLight.src = "./img/icons/RD-logo-lightmode.svg";
        logoImageLight.classList.add("light-theme");

    }

    /**
     * Makes navigation links to the
     * header navigation menu
     * @param {HTMLElement} parent
     * @param {string} url 
     * @param {string} name 
     */
    addLI(parent, url, name) {
        const li = this.create("li");
        parent.appendChild(li);

        const a = anchor(li, url);

        const h2 = this.create("h2");
        h2.textContent = name;

        a.append = h2;
    }

    /**
     * Creates the ham
     */
    addThemeButton() {
        const wrapper = divider(this.mainElement);
        wrapper.class = "light-dark-switch-wrapper";

        const h2_light = this.create("h2");
        wrapper.append = h2_light;
        h2_light.textContent = "LIGHT";


        const label = this.create("label");
        label.classList.add("theme-switch");
        wrapper.append = label;

        const h2_dark = this.create("h2");
        wrapper.append = h2_dark;
        h2_dark.textContent = "DARK";

        this.input = this.create("input");
        this.input.id = "theme-toggle";
        this.input.type = "checkbox";
        label.appendChild(this.input);

        if (getBrowserColor()) {
            this.input.checked = false;
        }
        else {
            this.input.checked = true;
        }

        const span = this.create("span");
        span.classList.add("slider");
        label.appendChild(span);
    }
    /**
     * 
     * @returns {boolean}
     */
}

export class Footer extends Body {
    /**
     * Creates and handles the footer of the body
     */
    constructor() {
        super("footer")
        this.body.appendChild(this.mainElement);

        const divLeft = divider(this.mainElement);
        const divCenter = divider(this.mainElement);
        const divRight = divider(this.mainElement);

        divLeft.class = "footer-text";
        divCenter.class = "logo-footer";
        divRight.class = "footer-text";

        const leftText = this.create("p");
        divLeft.append = leftText;
        leftText.style.whiteSpace = "pre-line";
        leftText.textContent = "Call us on <SOME PHONE NUMBER>\n Email us on post@rainydays.weather";

        const rightText = this.create("p");
        divRight.append = rightText;
        rightText.style.whiteSpace = "pre-line";
        rightText.textContent = "Mr. Sells, our founder, saw the need for quality mid-range jackets, and decided to make this, now long standing and reputable brand. All content is fictonal - probably.";

        const lightFooterImg = this.create("img");
        const darkFooterImg = this.create("img");
        divCenter.appendList(lightFooterImg, darkFooterImg);
        lightFooterImg.classList.add("light-theme");
        darkFooterImg.classList.add("dark-theme");

        lightFooterImg.src = "./img/icons/RD-logo-footer-lightmode.svg";
        darkFooterImg.src = "./img/icons/RD-logo-footer-darkmode.svg";
    }
}

export function makeHeaderAndFooter() {
    new Header();
    new Footer();
}