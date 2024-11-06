import { ConstructDOM } from "./ConstructDOM";

export class ConstructListDOM extends ConstructDOM {
  constructor(listContents, classNames = [], itemsClassNames = []) {
    super("ul", classNames);
    this.listContents = listContents;
    this.itemsClassNames = itemsClassNames;
    this.createListContent();
  }

  createListContent() {
    this.listContents.forEach((content) => {
      let listItem = new ConstructDOM("li", this.itemsClassNames);
      if (typeof content == "string") {
        listItem.setContent(content);
        content = listItem;
      }
      this.insertItems([content]);
    });
  }
}
