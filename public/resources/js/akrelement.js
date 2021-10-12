class AkrElement {
    /**
     * @param string div 
     */
    constructor(div) {
        this.element = document.createElement(div)
    }

    /**
     * 
     * @param HTMLElement elem 
     */
    static getFromHTMLElement(elem) {
        return new AkrElement('div').setElement(elem);
    }

    static getFromId(id) {
        return new AkrElement('div').setElement(document.getElementById(id));
    }

    /**
     * 
     * @returns int number of child nodes in given node
     */
    getChildCount() {
        return this.element.children.length
    }

    getFirstChild() {
        return AkrElement.getFromHTMLElement(this.element.childNodes[0]);
    }

    /**
     * 
     * @param string name 
     * @param string value 
     */
    setAttribute(name, value) {
        this.element.setAttribute(name, value)
        return this
    }

    /**
     * 
     * @param {string} name 
     * @param {string} value 
     * @param {Boolean} condition 
     * @returns 
     */
    setAttributeIF(name, value, condition) {
        let cond;
        if (typeof condition === "function") {
            cond = condition();
        } else {
            cond = condition;
        }
        if (cond) { this.setAttribute(name, value) }
        return this;
    }


    /**
     * 
     * @param HTMLElement elem 
     */
    setElement(elem) {
        this.element = elem;
        return this;
    }

    /**
     * 
     * @param string tag
     * @param {Array<string>} nodevalues 
     */
    addChildsFromArrayTag(tag, nodevalues) {
        for (let i = 0; i < nodevalues.length; i++) {
            this.addChild(
                new AkrElement(tag)
                .setInnerText(nodevalues[i])
            )
        }
        return this;
    }

    /**
     * 
     * @param {Array<AkrElement>} childs 
     */
    addChilds(childs) {
        childs.map((child, index) => {
            this.addChild(child);
        });
        return this;
    }

    /**
     * 
     * @param string name
     * @returns {string} Attribute value 
     */
    getAttribute(name) {
        return this.element.getAttribute(name)
    }

    /**
     * 
     * @param string html 
     */
    setInnerHTML(html) {
        this.element.innerHTML = html
        return this
    }

    /**
     * 
     * @param string text 
     */
    setInnerText(text) {
        this.element.innerText = text
        return this
    }

    /**
     * 
     * @param AkrElement child 
     */
    addChild(child) {
        this.element.appendChild(child.getElement())
        return this
    }

    addChildIf(child1, child2, condition) {
        let value;
        if (typeof condition === "function") {
            value = condition();
        } else {
            value = condition;
        }
        if (value) { this.addChild(child1) } else { this.addChild(child2) }
        return this;
    }

    /**
     * 
     * @param AkrElement child 
     * @returns AkrElement
     */
    removeChild(child) {
        this.element.removeChild(child.getElement())
        return this;
    }

    /**
     * 
     * @param Number index 
     */
    removeChildAt(index) {
        this.element.removeChild(this.element.childNodes[index])
        return this
    }

    /**
     * 
     * @param Number index 
     */
    removeChildsAfter(index) {
        while (this.element.childNodes[index] != null) {
            this.element.removeChild(this.element.childNodes[index])
        }
    }

    /**
     * 
     * @param AkrElement child 
     */
    addChildAtFirst(child) {
        this.element.insertBefore(child.getElement(), this.element.childNodes[0])
        return this
    }

    /**
     * 
     * @param AkrElement child 
     * @param Number index 
     */
    addChildAt(child, index) {
        this.element.insertBefore(child.getElement(), this.element.childNodes[index]);
        return this;
    }

    /**
     * 
     * @param AkrElement child 
     * @param AkrElement before
     */
    addChildBefore(child, before) {
        this.element.insertBefore(child.getElement(), before.getElement())
        return this
    }

    /**
     * 
     * @param {array} elementsArray 
     */
    static getClones(elementsArray) {
        let array = [];
        elementsArray.map((child, index) => {
            array.push(AkrElement.getFromHTMLElement(child.getElement().cloneNode(true)))
        })
        return array;
    }

    /**
     * 
     * @param {function(e):void} callback 
     */
    onClick(callback) {
        this.element.addEventListener('click', (e) => {
            callback(e);
        });
        return this;
    }

    on(event, callback) {
        this.element.addEventListener(event, (e) => { callback(e, this) });
        return this;
    }

    /**
     * 
     * @param string name 
     * @param string value 
     * @returns {AkrElement}
     */
    addStyle(name, value) {
        let style = this.getAttribute('style');
        let newstyle = name + ': ' + value;
        this.element.setAttribute('style', (style == null ? newstyle : style + '; ' + newstyle))
        return this;
    }

    /**
     * @param event eventname 
     * @param function():void callback 
     */
    addEventListener(eventname, callback) {
        this.element.addEventListener(eventname, callback)
        return this
    }

    /**
     * 
     * @param string classname
     * @returns Boolean 
     */
    containsClass(classname) {
        return this.element.classList.contains(classname);
    }

    /**
     * @param string name 
     */
    addClass(name) {
        this.element.classList.add(name)
        return this
    }

    /**
     * 
     * @param Boolean addFirst
     * @param string name1 
     * @param string name2 
     */
    addClassWithCondition(addFirst, name1, name2) {
        if (addFirst) {
            this.element.classList.add(name1)
        } else {
            this.element.classList.add(name2)
        }
        return this;
    }

    /**
     * 
     * @param string name 
     */
    removeClass(name) {
        this.element.classList.remove(name)
        return this
    }

    removeAllChildren() {
        var child = this.element.lastElementChild;
        while (child) {
            this.element.removeChild(child);
            child = this.element.lastElementChild;
        }
        return this;
    }

    toString() {
        return this.element.outerHTML
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * 
     * @param string name 
     * @param Boolean value 
     */
    setSingleAttribute(name, value, condition = -1) {
        if (condition != -1) {
            if (condition) {
                this.element[name] = value
            }
        } else {
            this.element[name] = value
        }
        return this
    }

    /**
     * 
     * @param function():void callback 
     */
    run(callback) {
        callback();
        return this;
    }
    addDropDownMenuItems(rows) {
        for (let i = 0; i < rows.length; i++) {
            this.addChild(new AkrElement('a').setAttribute('href', '/products/list?category=' + rows['category_tag']).setInnerText(rows['category_name']));
        }
        this.addChild(new AkrElement('a').setAttribute('href', '/products/list').setAttribute('class', 'w3-border-top w3-border-gray').setInnerText('All Products'))
        return this;
    }
    addProductCategoryTile(images, title, img_class = 'category-img', span_class = 'category-title') {
        for (let i = 0; i < images.length; i++) {
            this.addChild(
                new AkrElement('a').setAttribute('href', '/products/list?category=' + getShortenedString(title[i]))
                .addChild(new AkrElement('img').setAttribute('class', img_class).setAttribute('src', images[i]))
                .addChild(new AkrElement('span').setAttribute('class', span_class).setInnerText(title[i]))
            )
        }
        return this;
    }
}