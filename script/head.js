
export class Head {
    constructor() {
        this.head = document.head;
        this.create = document.createElement.bind(document);
        this.addMeta({ charset: "UTF-8" });
        this.addMeta({ name: "viewport", content: "width=device-width, initial-scale=1.0" });
        this.addLink({ link: "./style/base.css" })
    }


    /**
      * @param {Object} options
      * @param {string} [options.charset]
      * @param {string} [options.name]
      * @param {string} [options.content]
      */
    addMeta({ charset, name, content } = {}) {
        const meta = this.create("meta");
        if (charset) {
            meta.setAttribute("charset", charset);
        }
        if (name) {
            meta.setAttribute("name", name);
        }
        if (content) {
            meta.setAttribute("content", content);
        }
        this.head.appendChild(meta);
    }


    /**
      * @param {Object} options
      * @param {string} [options.link]
      * @param {string} [options.rel]
      * @param {string} [options.crossorigin]
      */
    addLink({ link, rel, crossorigin } = {}) {
        this.link = this.create("link");
        if (rel) {
            this.link.rel = rel;
        }
        if (link) {
            this.link.href = link;
        }
        if (crossorigin) {
            this.link.crossOrigin = crossorigin;
        }
        this.head.appendChild(this.link);
    }
}