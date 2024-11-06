import { Calc } from "./form/Calc";
import { Select } from "./form/Select";

const calc = new Calc(
  "#calc",
  "#pay",
  "#receive",
  document.querySelector("#reset"),
  document.querySelector("#rotate"),
);

const select = new Select([
  { "value": "trx", "text": "trx" },
  { "value": "nxm", "text": "nxm", "selected": true },
]);

const payInput = document.querySelector("#pay");
payInput.after(select.elem);
// console.log(payInput);

// console.log(select.elem);
