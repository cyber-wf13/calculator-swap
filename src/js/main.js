import { Calc } from "./form/Calc";
import { Select } from "./form/Select";
import { Exchange } from "./logical/Exchange";
import { closeByAnyClick } from "./utils";

const calc = new Calc(
  "#calc",
  "#pay",
  "#receive",
  document.querySelector("#reset"),
  document.querySelector("#rotate"),
);

const ex = new Exchange();
ex.fillCurrencyInfo().then((info) => {
  const paySelect = new Select(
    info.map((item) => {
      return {
        "value": item.code,
        "text": item.name,
      };
    }),
  );

  const payInput = document.querySelector("#pay");
  paySelect.elem.addEventListener("select", (e) => {
    console.log("select", e.detail.value);
    ex.fillCurrencyExchange(e.detail.value).then((curr) => {
      console.log(curr);
    });
  });
  payInput.after(paySelect.elem);
});

// const receiveSelect = new Select([
//   { "value": "trx", "text": "trx", "selected": true },
//   { "value": "nxm", "text": "nxm" },
// ]);
// const receiveInput = document.querySelector("#receive");
// receiveInput.after(receiveSelect.elem);
