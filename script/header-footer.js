import { getBrowserColor } from "./main.js"

export class Header {
    /**
     * 
     * @param {HTMLElement} body 
     */
    constructor(body) {
        this.create = document.createElement.bind(document);
        this.body = body;
        this.header = this.create("header");
        this.body.prepend(this.header);

        const nav = this.create("nav");
        nav.classList.add("nav-wrapper");
        this.header.appendChild(nav);

        const ul = this.create("ul");
        this.header.appendChild(nav);
        nav.appendChild(ul);

        this.addLI(ul, "./content-overview", "Jackets")
        this.addLI(ul, "./sizes", "Size Guide")
        this.addLI(ul, "./about-us", "Information")
        this.addLI(ul, "../payment", "Cart")

        //    <div id="hamburger-menu">
        //        <input id="navigation-menu-wrapper" type="checkbox">
        //        <img src="./img/icons/hamburger-lightmode.svg" alt="Hamburger icon" class="light-theme">
        //        <img src="./img/icons/hamburger-darkmode.svg" alt="Hamburger icon" class="dark-theme">
        //    </div>
        //</header>`
        this.addLogo()
        this.addThemeButton(this.header);
    }

    /**
     * Adds (prepends) the logo image to the header
     */
    addLogo() {
        const logoWrapper = this.create("div");
        this.logoLink = this.create("a");
        this.logoLink.href = "./";
        this.logoImage = this.create("img");
        logoWrapper.classList.add("logo-wrapper")
        logoWrapper.appendChild(this.logoLink);
        this.logoLink.appendChild(this.logoImage);
        let logoLink;
        if (getBrowserColor()) {
            logoLink = "./img/icons/RD-logo-lightmode.svg";
        }
        else {
            logoLink = "./img/icons/RD-logo-darkmode.svg";
        }
        this.logoImage.src = logoLink;
        this.logoLink.classList.add("logo")
        this.header.prepend(logoWrapper)
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

        const a = this.create("a");
        a.href = url;

        const h2 = this.create("h2");
        h2.textContent = name;

        a.appendChild(h2);
        li.appendChild(a);
    }

    /**
     * Creates the ham
     * @param {HTMLElement} parent 
     */
    addThemeButton(parent) {
        const wrapper = this.create("div");
        parent.appendChild(wrapper);
        wrapper.classList.add("light-dark-switch-wrapper")

        const h2_light = this.create("h2");
        wrapper.appendChild(h2_light);
        h2_light.textContent = "LIGHT";


        const label = this.create("label");
        label.classList.add("theme-switch");
        wrapper.append(label);

        const h2_dark = this.create("h2");
        wrapper.appendChild(h2_dark);
        h2_dark.textContent = "DARK";

        this.input = this.create("input");
        this.input.id = "theme-toggle";
        this.input.type = "checkbox";
        label.appendChild(this.input);

        if (getBrowserColor()) {
            this.input.checked = true;
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

export class Footer {
    /**
     * 
     * @param {HTMLElement} body 
     */
    constructor(body) {
        this.create = document.createElement.bind(document);
        this.body = body;
        this.footer = this.create("footer");
        this.body.appendChild(this.footer);
    }
}

export function makeHeaderAndFooter() {
    const body = document.body;
    if (!body) return;
    new Header(body)
    new Footer(body)
}