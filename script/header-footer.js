import { getBrowserColor } from "./theme-switch.js";
import { anchor, divider, image, paragraph, button } from "./html-elements.js";
import { selectScreen } from "./main.js";

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
     *
     */
    createHambuger() {
        const hamburgerDiv = divider(this.mainElement);
        hamburgerDiv.id = "hamburger-menu";

        const hamburgerInput = this.create("button");
        hamburgerInput.id = "navigation-menu-wrapper";
        hamburgerDiv.append = hamburgerInput;
        const hamburgerImgLight = image(hamburgerInput, "./img/icons/hamburger-lightmode.svg", "Hamburger icon");
        hamburgerImgLight.class = "light-theme";
        const hamburgerImgDark = image(hamburgerInput, "./img/icons/hamburger-darkmode.svg", "Hamburger icon");
        hamburgerImgDark.class = "dark-theme";
        hamburgerInput.onclick = () => {
            this.hamburgerActiveState();
        }
        this.mainElement.onmouseleave = () => this.nav?.classList.remove("hamburger-active-state");
    }

    /**
     * This function activates or deactivates the hamburger view state, and
     * returns false if the hamburger menu is now hidden for some reason.
     * @returns {boolean}
     */
    hamburgerActiveState() {
        const nav = this.nav;
        if (!nav) return false;
        const state = nav.classList.contains("hamburger-active-state");
        if (state) {
            nav.classList.remove("hamburger-active-state");
            return true
        }
        nav.classList.add("hamburger-active-state")
        return false
    }

    /**
     * Adds the navigation menu to the header
     */
    createNav() {
        this.nav = this.create("nav");
        this.nav.classList.add("nav-wrapper");
        this.mainElement.appendChild(this.nav);
        const ul = this.create("ul");
        this.mainElement.appendChild(this.nav);
        this.nav.appendChild(ul);
        this.addListItem(ul, "Jackets", "frontScreen");
        this.addListItem(ul, "About Us", "about");
        this.addListItemWithImage(ul, "Cart", "cart", "/javascript1-egil-dahle/img/icons/cart-lightmode.svg",  "/javascript1-egil-dahle/img/icons/cart-darkmode.svg");
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
     * @param {string} name 
     * @param {string} page 
     */
    addListItem(parent, name, page) {
        const li = this.create("li");
        parent.appendChild(li);
        const navigationButton = button(li, name, selectScreen, page);
        navigationButton.class = "headerNavButton";
    }

    /**
     * Makes navigation links to the
     * header navigation menu with images, like the cart icon
     * @param {HTMLElement} parent
     * @param {string} name 
     * @param {string} page 
     * @param {string} imagePathLight
     * @param {string} imagePathDark
     */
    addListItemWithImage(parent, name, page, imagePathLight, imagePathDark) {
        const li = this.create("li");
        parent.appendChild(li);
        const navigationButton = button(li, name, selectScreen, page);
        navigationButton.prependImage(imagePathLight, "light-theme");
        navigationButton.prependImage(imagePathDark, "dark-theme");
        navigationButton.class = "headerNavButton";
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
        this.input.addEventListener("change", () => {
            const value = localStorage.getItem("theme");
            localStorage.setItem("theme", value === "light" ? "dark" : "light");
        });

        this.input.checked = !getBrowserColor();

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

    leftDiv() {
        const divLeft = divider(this.mainElement);
        divLeft.class = "footer-text";
        const leftText = paragraph(divLeft, "Call us on <SOME PHONE NUMBER>\n Email us on post@rainydays.weather");
        leftText.whiteSpace = "pre-line";
    }
    centerDiv() {
        const divCenter = divider(this.mainElement);
        divCenter.class = "logo-footer";
        const lightFooterImg = image(divCenter, "./img/icons/RD-logo-footer-lightmode.svg", "Rainy Days footer logo for light-theme");
        const darkFooterImg = image(divCenter, "./img/icons/RD-logo-footer-darkmode.svg", "Rainy Days footer logo for dark-theme");
        lightFooterImg.class = "light-theme";
        darkFooterImg.class = "dark-theme";
    }
    rightDiv() {
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

