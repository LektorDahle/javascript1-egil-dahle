class Header {
    /**
     * 
     * @param {HTMLElement} body 
     */
    constructor(body) {
        this.create = document.createElement.bind(document);
        this.body = body;
        this.header = this.create("header");
        this.body.prepend(this.header);
    }

    /**
     * @todo Add functionality to add/change the logo image depending on dark/light mode
     * @param {string} link 
     */
    addLogo(link){

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