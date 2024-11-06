import { ConstructDOM } from "../DOM/ConstructDOM";

export class Select extends ConstructDOM {
  constructor(selectItems) {
    super("div", ["select"]);
    this.selectItems = selectItems;
    this.headText = selectItems[0].text;

    this.createSelectItems();
    this.createSelectHead();
  }

  createSelectHead() {
    const head = new ConstructDOM("div", ["select__header"]);
    head.setAttr({ "tabindex": 0 });
    head.setContent(this.headText);
    this.insertItems([head], false);
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

    input.setAttr({
      "id": item.value,
      "type": "checkbox",
      "name": item.value,
      "value": item.value,
      "tabindex": -1,
    });

    label.setAttr({
      "for": item.value,
      "tabindex": 0,
    });

    label.setContent(item.text);
    listItems.insertItems([input, label]);
  }
}
