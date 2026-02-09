class MyElement {
    /**
     * MyElement is an base-class for creation and handling of
     * HTML elemnts, hopefully to make other parts of the code more readable!
     * @param {HTMLElement | MyElement} parent 
     * @param {string} tag 
     */
    constructor(parent, tag) {
        this.element = document.createElement(tag)

        const parentElement = parent instanceof MyElement ? parent.element : parent;
        if (parentElement) parentElement.appendChild(this.element);
    }

    /**
     * appendList is named this because it takes more than one
     * child to be appended - works like a normal function call
     * with the children as params
     * @param  {...HTMLElement} children 
     */
    appendList(...children) {
        children.forEach(child => {
            this.element.appendChild(child)
        });
    }

    /**
     * This adds a classname to the element
     * @param {string} name
     */
    set class(name) {
        this.element.classList.add(name);
    }

    /**
      * This returns a string of all the classes of the element
      */
    get class() {
        return this.element.className;
    }

    /**
      * Sets the id of the element
      * @param {string} idName
      */
    set id(idName) {
        this.element.id = idName;
    }

    /**
      * Gets the id of the element
      */
    get id() {
        return this.element.id;
    }

    /**
      * Uses html appendChild in a setter
      * @param {HTMLElement} child
      */
    set append(child) {
        this.element.appendChild(child);
    }

    /**
      * Uses html prepend in a setter
      * @param {HTMLElement} child
      */
    set prepend(child) {
        this.element.prepend(child);
    }
}

class Div extends MyElement {
    /**
     * Used to create a div element, takes parent as an argument
     * @param {HTMLElement | MyElement} parent 
     */
    constructor(parent) {
        super(parent, "div")
    }
}

class A extends MyElement {
    /**
     * Used to create an a element, takse parent and href as an argument
     * @param {HTMLElement | MyElement} parent 
     * @param {string} src
     */
    constructor(parent, src) {
        super(parent, "a");
        /** @type {HTMLAnchorElement} */(this.element).href = src;
    }
}

class Img extends MyElement {
    /**
      * @param {HTMLElement | MyElement} parent 
      * @param { string } link
      * @param { string } alternativeText
      */
    constructor(parent, link, alternativeText) {
        super(parent, "img");
        /** @type {HTMLImageElement} */(this.element).src = link;
        /** @type {HTMLImageElement} */(this.element).alt = alternativeText;
    }
}

class P extends MyElement {
    /**
      * @param {HTMLElement | MyElement} parent 
      * @param { string } text
      */
    constructor(parent, text) {
        super(parent, "p")
        this.element.textContent = text;
    }

    /** @param {string} text */
    set whiteSpace(text){
        this.element.style.whiteSpace = text;
    }
}
/**
  * Creates a new a element with parent and link as argument
  * @param {HTMLElement | MyElement} parent 
  * @param {string} src 
  */
export const anchor = (parent, src) => new A(parent, src);

/**
  * Creates a new div element with parent as argument
  * @param {HTMLElement | MyElement} parent 
  */
export const divider = (parent) => new Div(parent);

/** 
  * Creates a new img element with parent, image path and alt text as arguments
  * @param {HTMLElement | MyElement} parent
  *  @param {string} link 
  *  @param {string} alternativeText 
  */
export const image = (parent, link, alternativeText) => new Img(parent, link, alternativeText);

/**
  * Creates a new paragraph element with parent and textContent as arguments
  * @param {HTMLElement | MyElement} parent
  *  @param {string} text 
  */
export const paragraph = (parent, text) => new P(parent, text);