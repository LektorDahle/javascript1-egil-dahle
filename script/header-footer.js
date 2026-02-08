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


        this.header.innerHTML = `
        <div class="light-dark-switch-wrapper">
            <h2>LIGHT</h2>
            <label class="theme-switch">
                <input id="theme-toggle" type="checkbox">
                <span class="slider"></span>
            </label>
            <h2>DARK</h2>
        </div>
        <div id="hamburger-menu">
            <input id="navigation-menu-wrapper" type="checkbox">
            <img src="./img/icons/hamburger-lightmode.svg" alt="Hamburger icon" class="light-theme">
            <img src="./img/icons/hamburger-darkmode.svg" alt="Hamburger icon" class="dark-theme">
        </div>
    </header>`
        this.addLogo("./img/icons/RD-logo-lightmode.svg")
    }

    /**
     * Adds (prepends) the logo image to the header
     * @param {string} link 
     */
    addLogo(link) {
        const logoWrapper = this.create("div");
        this.logoLink = this.create("a");
        this.logoLink.href = "./";
        this.logoImage = this.create("img");
        logoWrapper.classList.add("logo-wrapper")
        logoWrapper.appendChild(this.logoLink);
        this.logoLink.appendChild(this.logoImage);
        this.logoImage.src = link;
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
        h2.innerText = name;

        a.appendChild(h2);
        li.appendChild(a);
    }
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