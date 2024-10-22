import { Calc } from "./form/Calc";

const calc = new Calc(
  "#calc",
  "#pay",
  "#receive",
  document.querySelector("#reset"),
  document.querySelector("#rotate"),
);
console.log(calc);
