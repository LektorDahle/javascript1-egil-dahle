import { getBrowserColor } from "./main.js";
import { anchor, divider, image, paragraph } from "./html-elements.js";

class Body {
    /**
      * Body as a base element for the header and footer
      * @param {string} tag
      */
    constructor(tag) {
        this.body = document.body ?? (() => { throw new Error("body missing - document initalization bug, possibly defer missing."); })();
        this.create = document.createElement.bind(document);
        this.mainElement = this.create(tag);
    }
}

export class Header extends Body {
    /**
     * Creates and handles the header of the body
     */
    constructor() {
        super("header");
        this.body.prepend(this.mainElement);

        this.addLogo();
        this.createNav();
        this.createHambuger();
        this.addThemeButton();
    }

    /**
     * Adds the hamburger menu that appares when screen width is less than some pixel value
     * @todo 
     * Update hamburger with JS
     * Currently it is not dissapering when screen size is changed, so that yoy
     */
    createHambuger() {
        const hamburgerDiv = divider(this.mainElement);
        hamburgerDiv.id = "hamburger-menu";

        const hamburgerInput = this.create("input");
        hamburgerInput.id = "navigation-menu-wrapper";
        hamburgerInput.type = "checkbox";
        hamburgerDiv.append = hamburgerInput;
        const hamburgerImgLight = image(hamburgerDiv, "./img/icons/hamburger-lightmode.svg", "Hamburger icon");
        hamburgerImgLight.class = "light-theme";
        const hamburgerImgDark = image(hamburgerDiv, "./img/icons/hamburger-darkmode.svg", "Hamburger icon");
        hamburgerImgDark.class = "dark-theme";
    }

    /**
     * Adds the navigation menu to the header
     */
    createNav() {
        const nav = this.create("nav");
        nav.classList.add("nav-wrapper");
        this.mainElement.appendChild(nav);

        const ul = this.create("ul");
        this.mainElement.appendChild(nav);
        nav.appendChild(ul);

        this.addListItem(ul, "./content-overview", "Jackets");
        this.addListItem(ul, "./sizes", "Size Guide");
        this.addListItem(ul, "./about-us", "Information");
        this.addListItem(ul, "../payment", "Cart");
    }
    /**
     * Adds (prepends) the logo image to the header
     */
    addLogo() {
        const logoWrapper = divider(this.mainElement);
        const logoLink = anchor(logoWrapper, "./");
        logoWrapper.class = "logo-wrapper";
        logoLink.class = "logo";

        const logoImageDark = image(logoLink, "./img/icons/RD-logo-darkmode.svg", "Rainy Days logo for dark-theme");
        const logoImageLight = image(logoLink, "./img/icons/RD-logo-lightmode.svg", "Rainy Days logo for light-theme");

        //Adding dark and light theme logos to the document, so that
        //the "old" system of using CSS to change color theme will work.
        logoImageDark.class = "dark-theme";
        logoImageLight.class = "light-theme";
    }

    /**
     * Makes navigation links to the
     * header navigation menu
     * @param {HTMLElement} parent
     * @param {string} url 
     * @param {string} name 
     */
    addListItem(parent, url, name) {
        const li = this.create("li");
        parent.appendChild(li);

        const a = anchor(li, url);

        const h2 = this.create("h2");
        h2.textContent = name;

        a.append = h2;
    }

    /**
     * Creates the theme change button
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
}

export class Footer extends Body {
    /**
     * Creates and handles the footer of the body
     */
    constructor() {
        super("footer");
        this.body.appendChild(this.mainElement);

        this.leftDiv();
        this.centerDiv();
        this.rightDiv();

    }

    leftDiv(){
        const divLeft = divider(this.mainElement);
        divLeft.class = "footer-text";
        const leftText = paragraph(divLeft, "Call us on <SOME PHONE NUMBER>\n Email us on post@rainydays.weather");
        leftText.whiteSpace = "pre-line";
    }
    centerDiv(){
        const divCenter = divider(this.mainElement);
        divCenter.class = "logo-footer";
        const lightFooterImg = image(divCenter, "./img/icons/RD-logo-footer-lightmode.svg", "Rainy Days footer logo for light-theme");
        const darkFooterImg = image(divCenter, "./img/icons/RD-logo-footer-darkmode.svg", "Rainy Days footer logo for dark-theme");
        lightFooterImg.class = "light-theme";
        darkFooterImg.class = "dark-theme";
    }
    rightDiv(){
        const divRight = divider(this.mainElement);
        divRight.class = "footer-text";
        const rightText = paragraph(divRight, "Mr. Sells, our founder, saw the need for quality mid-range jackets, and decided to make this, now long standing and reputable brand. All content is fictonal - probably.");
        rightText.whiteSpace = "pre-line";
    }
}

export function makeHeaderAndFooter() {
    new Header();
    new Footer();
}