import { Calc } from "./form/Calc";
import { CalcUAH } from "./form/CalcUAH";
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

  const calcUah = new CalcUAH(ex.getTopCurrency());
  calcUah.createStructure();
  calcUah.insertToBlock(".calc__wrapper");
});

const menuBtn = document.querySelector(".menu-hamburger");
const menu = document.querySelector(".menu");
menuBtn.addEventListener("click", () => {
  document.body.classList.toggle("_block");
  menu.classList.toggle("menu--mobile");
});
