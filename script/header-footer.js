class Header {
    /**
     * 
     * @param {HTMLElement} body 
     */
    constructor(body) {
        this.create = document.createElement.bind(document);
        this.body = body;
        this.header = this.create("header");
        this.header.innerHTML = ` <nav class="nav-wrapper">
            <ul>
                <li>
                    <a href="./content-overview">
                        <h2>Jackets</h2>
                    </a>
                </li>
                <li>
                    <a href="./sizes">
                        <h2>Size Guide</h2>
                    </a>
                </li>
                <li>
                    <a href="./about-us">
                        <h2>Information</h2>
                    </a>
                </li>
                <li>
                    <a href="./payment">
                        <img src="./img/icons/cart-lightmode.svg" alt="Cart icon" class="light-theme">
                        <img src="./img/icons/cart-darkmode.svg" alt="Cart icon" class="dark-theme">
                        <h2>Cart</h2>
                    </a>
                </li>
            </ul>
        </nav>
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
        this.body.prepend(this.header);
        this.addLogo("./img/icons/RD-logo-lightmode.svg")
    }

    /**
     * @todo Add functionality to add/change the logo image depending on dark/light mode
     * @param {string} link 
     */
    addLogo(link) {
        const logoWrapper = this.create("div");
        this.logoLink = this.create("a");
        this.logoImage = this.create("img");
        logoWrapper.classList.add("logo-wrapper")
        logoWrapper.appendChild(this.logoLink);
        this.logoLink.appendChild(this.logoImage);
        this.logoImage.src = link;
        this.logoLink.classList.add("logo")
        this.header.prepend(logoWrapper)
    }
}

class Footer {
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