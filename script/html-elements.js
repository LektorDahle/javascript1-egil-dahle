class MyElement {
    /**
     * 
     * @param {HTMLElement | MyElement} parent 
     * @param {string} tag 
     */
    constructor(parent, tag) {
        this.element = document.createElement(tag)

        const parentElement = parent instanceof MyElement ? parent.element : parent;
        if (parentElement) parentElement.appendChild(this.element);
    }

    /**
     * 
     * @param  {...HTMLElement} children 
     */
    appendList(...children) {
        children.forEach(child => {
            this.element.appendChild(child)
        });
    }

    /**
     * @param {string} name
     */
    set class(name) {
        this.element.classList.add(name);
    }

    get class() {
        return this.element.className;
    }

    /**
      * @param {string} idName
      */
    set id(idName) {
        this.element.id = idName;
    }

    get id() {
        return this.element.id;
    }

    /**
      * @param {HTMLElement} child
      */
    set append(child) {
        this.element.appendChild(child);
    }

    /**
      * @param {HTMLElement} child
      */
    set prepend(child) {
        this.element.prepend(child);
    }
}

export class Div extends MyElement {
    /**
     * 
     * @param {HTMLElement | MyElement} parent 
     */
    constructor(parent) {
        super(parent, "div")
    }
}

export class A extends MyElement {
    /**
     * 
     * @param {HTMLElement | MyElement} parent 
     * @param {string} src
     */
    constructor(parent, src) {
        super(parent, "a");
        /** @type {HTMLAnchorElement} */(this.element).href = src;
    }
}