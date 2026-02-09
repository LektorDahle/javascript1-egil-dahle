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

/**
  * Uses the class A to create a new a element
  * @param {HTMLElement | MyElement} parent 
  * @param {string} src 
  */
export const createA = (parent, src) => new A(parent, src);

/**
  * Uses the class Div to create a new element
  * @param {HTMLElement | MyElement} parent 
  */
export const createDiv = (parent) => new Div(parent);