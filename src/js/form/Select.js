import { ConstructDOM } from "../DOM/ConstructDOM";
import { generateUniqId } from "../utils";

export class Select extends ConstructDOM {
  constructor(selectItems) {
    super("div", ["select"]);
    this.selectItems = selectItems;
    this.headText = selectItems[0].text;
    this.uniqId = generateUniqId("select");

    this.createSelectItems();
    this.head = this.createSelectHead();
    this.selectedValue = this.headText;
    // console.log(this.selectedValue);
  }

  createSelectHead() {
    const head = new ConstructDOM("div", ["select__header"]);
    head.elem.addEventListener("click", (e) => {
      this.clickHeadHandler();
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
      this.clickHeadHandler();
      this.changeItemHandler(ev);
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
    // TODO: спрацьовує при одному кліку декілька разів, потрібно змінити логіку
    window.addEventListener("click", (ev) => {
      if (!this.elem.contains(ev.target)) {
        console.log("click out");
        this.elem.classList.toggle("is-active");
      }
    });
    this.elem.classList.toggle("is-active");
  }

  changeItemHandler(ev) {
    this.selectItems = ev.target.value;
    this.updateSelectHead(this.selectItems);
    // TODO: спробувати додати Proxy для оновлення даних
  }
}
