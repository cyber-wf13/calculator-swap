export class Calc {
  constructor(calcSelector, paySelector, receiveSelector, resetBtn, rotateBtn) {
    this.calc = document.querySelector(calcSelector);
    this.inputPay = this.calc.querySelector(paySelector);
    this.inputReceive = this.calc.querySelector(receiveSelector);
    this.calcValue = this.inputPay.value;
    this.resetBtn = resetBtn;
    this.rotateBtn = rotateBtn;
    this.initEvents();
  }

  initEvents() {
    // this.inputPay.addEventListener("input", (e) =>
    //   this.setValue(this.calcValue),
    // );
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  setValue(currentValue) {
    this.inputReceive.value = currentValue;
  }

  validate() {}

  reset() {
    this.setValue(0);
    this.inputPay.value = "";
  }
}
