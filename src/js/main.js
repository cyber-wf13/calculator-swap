import { Calc } from "./form/Calc";
import { Select } from "./form/Select";
import { closeByAnyClick } from "./utils";

const calc = new Calc(
  "#calc",
  "#pay",
  "#receive",
  document.querySelector("#reset"),
  document.querySelector("#rotate"),
);

const paySelect = new Select([
  { "value": "trx", "text": "trx" },
  { "value": "nxm", "text": "nxm", "selected": true },
]);
const receiveSelect = new Select([
  { "value": "trx", "text": "trx", "selected": true },
  { "value": "nxm", "text": "nxm" },
]);

const payInput = document.querySelector("#pay");
const receiveInput = document.querySelector("#receive");
payInput.after(paySelect.elem);
receiveInput.after(receiveSelect.elem);
