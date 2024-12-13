import { ConstructDOM } from "../DOM/ConstructDOM";
import { generateUniqId, closeByAnyClick } from "../utils";

export class Select extends ConstructDOM {
  constructor(selectItems) {
    super("div", ["select"]);
    this.selectItems = selectItems;
    this.headText = selectItems[0].text;
    this.uniqId = generateUniqId("select");

    this.createSelectItems();
    this.head = this.createSelectHead();
    this.selectedValue = selectItems[0].value;
  }

  createSelectHead() {
    const head = new ConstructDOM("div", ["select__header"]);
    head.elem.addEventListener("click", () => {
      this.clickHeadHandler();
    });
    head.elem.addEventListener("keydown", (ev) => {
      this.keyDownHandler(ev, () => {
        this.elem.classList.add("is-active");
      });
    });
    head.setAttr({ "tabindex": 0 });
    head.setContent(this.headText);
    this.insertItems([head], false);
    return head;
  }

  updateSelectHead(value) {
    this.headText = value;
    this.head.setContent(this.headText);
  }

  createSelectItems() {
    const listItems = new ConstructDOM("div", ["select__items"]);
    this.selectItems.forEach((item) => this.formatList(item, listItems));
    this.insertItems([listItems]);
  }

  formatList(item, listItems) {
    const input = new ConstructDOM("input", ["select__item-input"]);
    const label = new ConstructDOM("label", ["select__item"]);

    if (item.hasOwnProperty("selected") && item.selected == true) {
      this.headText = item.text;
    }

    input.elem.addEventListener("change", (ev) => {
      ev.preventDefault();
      this.clickHeadHandler();
      this.changeItemHandler(ev.target.value, item.text);
      this.dispatchSelectEvent(ev.target.value);
    });

    label.elem.addEventListener("keydown", (ev) => {
      this.keyDownHandler(
        ev,
        (ev) => {
          const input = ev.srcElement.previousSibling;
          this.clickHeadHandler();
          this.changeItemHandler(input.value, item.text);
          this.dispatchSelectEvent(input.value);
        },
        ["Enter", "NumpadEnter", "Space"],
      );
    });

    const uniqId = generateUniqId("select-item");
    input.setAttr({
      "id": uniqId,
      "type": "radio",
      "name": this.uniqId,
      "value": item.value,
      "tabindex": -1,
    });

    label.setAttr({
      "for": uniqId,
      "tabindex": 0,
    });

    label.setContent(item.text);
    listItems.insertItems([input, label]);
  }

  clickHeadHandler() {
    closeByAnyClick(() => {
      this.elem.classList.remove("is-active");
    }, this.elem);

    this.elem.classList.toggle("is-active");
  }

  changeItemHandler(value, text) {
    this.selectedValue = value;
    this.updateSelectHead(text);
    // TODO: спробувати додати Proxy для оновлення даних
  }

  keyDownHandler(ev, cb, keys = ["Enter", "NumpadEnter"]) {
    const code = ev.code;
    if (keys.includes(code)) {
      cb(ev);
    }
  }

  resetValue() {
    this.selectedValue = this.selectItems[0]["value"];
    this.updateSelectHead(this.selectItems[0]["text"]);
  }

  dispatchSelectEvent(value, type = "select") {
    const customEvent = new CustomEvent(type, {
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }
}
