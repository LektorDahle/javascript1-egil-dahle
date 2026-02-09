export class Div {
    /**
     * 
     * @param {HTMLElement} parent 
     */
    constructor(parent) {
        this.div = document.createElement("div");
        parent.appendChild(this.div)
    }

    /**
     * 
     * @param  {...HTMLElement} children 
     */
    appendList(...children){
        children.forEach(child => {
            const element = child instanceof Div? child.div : child;
            this.div.appendChild(element)
        });
    }

    /**
     * @param {string} name
     */
    set class(name) {
        this.div.classList.add(name);
    }

    get class() {
        return this.div.className;
    }

    /**
      * @param {string} idName
      */
    set id(idName) {
        this.div.id = idName;
    }

    get id() {
        return this.div.id;
    }
    /**
      * @param {HTMLElement} child
      */
    set append(child){
        this.div.appendChild(child);
    }
}