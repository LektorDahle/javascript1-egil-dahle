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
        logoWrapper.classList.add("logo-wrapper")
        logoWrapper.appendChild(this.logoLink);
        this.logoLink.classList.add("logo");

        const logoImageDark = this.create("img");
        const logoImageLight = this.create("img");
        this.logoLink.append(logoImageDark, logoImageLight);
        
        //Adding dark and light theme logos to the document, so that
        //the "old" system of using CSS to change color theme will work.
        logoImageDark.src  = "./img/icons/RD-logo-darkmode.svg";
        logoImageDark.classList.add("dark-theme");
        logoImageLight.src  = "./img/icons/RD-logo-lightmode.svg";
        logoImageLight.classList.add("light-theme");

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

        const divLeft = this.create("div");
        const divCenter = this.create("div");
        const divRight = this.create("div");

        this.footer.append(divLeft, divCenter, divRight)

        divLeft.classList.add("footer-text");
        divCenter.classList.add("logo-footer");
        divRight.classList.add("footer-text");

        const leftText = this.create("p");
        divLeft.appendChild(leftText);
        leftText.style.whiteSpace = "pre-line";
        leftText.textContent = "Call us on <SOME PHONE NUMBER>\n Email us on post@rainydays.weather";

        const rightText = this.create("p");
        divRight.appendChild(rightText);
        rightText.style.whiteSpace = "pre-line";
        rightText.textContent = "Mr. Sells, our founder, saw the need for quality mid-range jackets, and decided to make this, now long standing and reputable brand. All content is fictonal - probably.";
    
        const lightFooterImg = this.create("img");
        const darkFooterImg = this.create("img");
        divCenter.append(lightFooterImg, darkFooterImg);
        lightFooterImg.classList.add("light-theme");
        darkFooterImg.classList.add("dark-theme");

        lightFooterImg.src = "./img/icons/RD-logo-footer-lightmode.svg"
        darkFooterImg.src = "./img/icons/RD-logo-footer-darkmode.svg"
    }
}


    //<footer>
    //    <div class="footer-text">
    //        <p>Call us on &lt;SOME PHONE NUMBER&gt;<br> Email us on post@rainydays.weather</p>
    //    </div>
    //    <div class="logo-footer">
    //        <img src="./images/icons/RD-logo-footer-version-lightmode.svg" alt="Rainy Days footer logo for light-theme" class="light-theme">
    //        <img src="./images/icons/RD-logo-footer-version-darkmode.svg" alt="Rainy Days footer logo for dark-theme" class="dark-theme">
    //    </div>
    //    <div class="footer-text">
    //        <p>Mr. Sells, our founder, saw the need for quality mid-range jackets, and decided to
    //            make this, now long standing and reputable brand. All content is fictonal - probably.</p>
    //    </div>
    //</footer>

export function makeHeaderAndFooter() {
    const body = document.body;
    if (!body) return;
    new Header(body)
    new Footer(body)
}