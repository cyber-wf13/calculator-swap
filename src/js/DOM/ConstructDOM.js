export class ConstructDOM {
  constructor(selector = "div", classNames = [], content = null) {
    this.classNames = classNames;
    this.selector = selector;
    this.elem = this.createElement();
    if (content) {
      this.setContent(content);
    }
  }

  createElement() {
    const elem = document.createElement(this.selector);
    if (Array.isArray(this.classNames)) {
      elem.classList.add(...this.classNames);
    } else {
      throw TypeError("Property classNames must be array!");
    }
    return elem;
  }

  insertItems(items, prepend = true) {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        prepend ? this.elem.append(item.elem) : this.elem.prepend(item.elem);
      });
    } else {
      throw TypeError("Property items must be array!");
    }
  }

  setAttr(attrObj) {
    for (const [attrName, attrValue] of Object.entries(attrObj)) {
      this.elem.setAttribute(attrName, attrValue);
    }
  }

  setContent(text) {
    this.elem.textContent = text;
  }

  setHtml(html) {
    this.elem.innerHTML = html;
  }
}
