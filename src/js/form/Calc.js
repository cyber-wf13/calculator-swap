export class Calc {
  constructor(calcSelector, paySelector, receiveSelector, resetBtn, rotateBtn) {
    this.calc = document.querySelector(calcSelector);
    this.inputPay = this.calc.querySelector(paySelector);
    this.inputReceive = this.calc.querySelector(receiveSelector);
    this.inputPayParrent = this.inputPay.closest(".calc-input");
    this.calcValue = this.inputPay.value;
    this.resetBtn = resetBtn;
  }

  setValue(currentValue) {
    const isValid = this.isNumber(currentValue);
    this.toggleErrorView(isValid);
    if (isValid) {
      this.inputReceive.value = currentValue.toFixed(2);
    } else {
      this.inputReceive.value = 0;
    }
  }

  isNumber(value) {
    if (Number.isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  }

  reset() {
    this.setValue(0);
    this.inputPay.value = "";
  }

  toggleErrorView(isValid) {
    if (isValid) {
      this.inputPayParrent.classList.remove("calc-input--error");
    } else {
      this.inputPayParrent.classList.add("calc-input--error");
    }
  }
}
