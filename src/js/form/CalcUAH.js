import { ConstructDOM } from "../DOM/ConstructDOM";

export class CalcUAH extends ConstructDOM {
  constructor(currency) {
    super("div", ["calc__wrapper-bottom"]);
    this.currency = currency;
  }

  createStructure() {
    for (const type in this.currency) {
      const body = new ConstructDOM("div", ["calc__wrapper-row", "calc-text"]);
      const title = new ConstructDOM("h6", ["calc-text__title"]);
      const text = new ConstructDOM("p", ["calc-text__text"]);
      const textBuyAccent = new ConstructDOM("span", [
        "calc-text__inner-text",
        "calc-text__inner-text--buy",
      ]);
      const textSellAccent = new ConstructDOM("span", [
        "calc-text__inner-text",
        "calc-text__inner-text--sell",
      ]);
      title.setContent(this.currency[type]["name"]);
      textBuyAccent.setContent(`Buy ${this.currency[type]["rateBuy"]}`);
      textSellAccent.setContent(`Sell ${this.currency[type]["rateSell"]}`);
      text.insertItems([textBuyAccent, textSellAccent]);
      body.insertItems([title, text]);
      this.insertItems([body]);
    }
  }

  insertToBlock(parrentSelector) {
    const parrent = document.querySelector(parrentSelector);
    parrent.append(this.elem);
  }
}
