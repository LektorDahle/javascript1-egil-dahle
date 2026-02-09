import { getBrowserColor } from "./main.js"
import { anchor, divider, image, paragraph } from "./html-elements.js";

class Body {
    /**
      * Body as a base element for the header and footer
      * @param {string} tag
      */
    constructor(tag) {
        const body = document.body;
        if (!body) throw new Error("Body missing - document initalization bug, possibly defer missing.");
        this.body = body
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
        const hamburgerImgLight = image(hamburgerDiv, "./img/icons/hamburger-lightmode.svg", "Hamburger icon")
        hamburgerImgLight.class = "light-theme";
        const hamburgerImgDark = image(hamburgerDiv, "./img/icons/hamburger-darkmode.svg", "Hamburger icon")
        hamburgerImgDark.class = "dark-theme";
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

        const leftText = paragraph(divLeft, "Call us on <SOME PHONE NUMBER>\n Email us on post@rainydays.weather")
        leftText.whiteSpace = "pre-line";

        const rightText = paragraph(divRight, "Mr. Sells, our founder, saw the need for quality mid-range jackets, and decided to make this, now long standing and reputable brand. All content is fictonal - probably.");
        rightText.whiteSpace = "pre-line";

        const lightFooterImg = image(divCenter, "./img/icons/RD-logo-footer-lightmode.svg", "Rainy Days footer logo for light-theme")
        const darkFooterImg = image(divCenter, "./img/icons/RD-logo-footer-darkmode.svg", "Rainy Days footer logo for dark-theme")
        lightFooterImg.class = "light-theme";
        darkFooterImg.class = "dark-theme";
    }
}

export function makeHeaderAndFooter() {
    new Header();
    new Footer();
}