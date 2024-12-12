import { Calc } from "./form/Calc";
import { Select } from "./form/Select";
import { Exchange } from "./logical/Exchange";
import { closeByAnyClick } from "./utils";

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
});

// ex.fillCurrencyInfo().then((info) => {

// });

// const receiveSelect = new Select([
//   { "value": "trx", "text": "trx", "selected": true },
//   { "value": "nxm", "text": "nxm" },
// ]);
// const receiveInput = document.querySelector("#receive");
// receiveInput.after(receiveSelect.elem);
