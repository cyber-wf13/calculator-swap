import { Calc } from "./form/Calc";
import { Select } from "./form/Select";
import { Exchange } from "./logical/Exchange";

const ex = new Exchange();
const calc = new Calc(
  "#calc",
  "#pay",
  "#receive",
  document.querySelector("#reset"),
);

ex.execRequestToAPI().then(() => {
  const paySelect = new Select(ex.getCurrencyInfo());
  const payInput = document.querySelector("#pay");

  const getExchangeWrap = () => {
    calc.setValue(ex.getExchange(paySelect.selectedValue, payInput.value));
  };

  paySelect.elem.addEventListener("select", getExchangeWrap);
  calc.inputPay.addEventListener("input", getExchangeWrap);
  payInput.after(paySelect.elem);

  calc.resetBtn.addEventListener("click", () => {
    paySelect.resetValue();
    calc.reset();
  });
});
