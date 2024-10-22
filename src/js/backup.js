const menuBtn = document.querySelector(".menu-hamburger");
const menu = document.querySelector(".menu");
const header = document.querySelector(".header");
const headerBtn = document.querySelector(".header__btn");
const headerBox = document.querySelector(".header__box");
const headerBoxTitle = document.querySelector(".header__box-title");
const headerBoxWrapper = document.querySelector(".header__box-wrapper");
const payInput = document.querySelector(".calc-input .calc-input__form");
const receiveInput = document.querySelector(
  ".calc-input__receive .calc-input__form",
);
const selectCurrent = document.querySelector(".select__current");
const selectReceiveCurrent = document.querySelector(".calc-input__text");
const dolarInput = document.querySelectorAll(".calc-input__bottom-text");
const calcRadio = document.querySelectorAll(".calc-text__box-radio");
const calcRadioInput = document.querySelector(".calc-text__box-input");
const calcFinnalyCost = document.querySelector(".calc-text__finally-count");
const innerTextRows = document.querySelectorAll(".calc-text__inner-text");
const calcBtnRotate = document.querySelector(".calc__btn-rotate");
const resetBtn = document.querySelector(".calc-input__top-btn");
const btnConnect = document.querySelector(".calc__btn-connect");
const messageError = document.querySelector(".calc__message--error");
const messageWarning = document.querySelector(".calc__message--warning");
const menuListItem = document.querySelectorAll(".menu__list-item");
let rotateCurrency = "NXM";
let currency = {
  "TRX": 0.06494,
  "NXM": 1084.1,
};
let dolar = {
  "TRX": 0.09108,
  "NXM": 74.5227,
};
// Кастомний <select>
let selectHeader = document.querySelectorAll(".select__header");
let selectItem = document.querySelectorAll(".select__item");

selectHeader.forEach((item, index) => {
  item.addEventListener("click", selectToggle);
});

selectItem.forEach((item) => {
  item.addEventListener("click", selectChoose);
});

function selectToggle() {
  this.parentElement.classList.toggle("is-active");
}

function selectChoose() {
  let text = this.innerText,
    select = this.closest(".select"),
    currentText = select.querySelector(".select__current");
  currentText.innerText = text;
  select.classList.remove("is-active");
  payInput.value = "";
  receiveInput.value = "";
  dolarInput.forEach((item) => {
    item.textContent = "≈$" + 0;
  });
  innerTextRows[2].innerHTML = `<span class="calc-text__finally-count">${(0).toFixed(
    5,
  )}</span> ${rotateCurrency}`;

  if (resetBtn.textContent == "Reset") {
    resetBtn.textContent = "Max";
    resetBtn.classList.remove("reset-btn--error");
  }
  payInput.closest(".calc-input").classList.remove("form-error");
  messageError.removeAttribute("style");
  if (messageWarning.hasAttribute("style")) {
    messageWarning.removeAttribute("style");
  } else {
    messageWarning.setAttribute("style", "display: block;");
  }
}
menuBtn.addEventListener("click", (event) => {
  let item = event.currentTarget;
  let itemStatus = item.dataset.active;
  if (itemStatus == "false") {
    item.setAttribute("style", "transform: rotate(-90deg);");
    item.children[0].setAttribute(
      "style",
      "transform: rotate(-45deg) translate(-5.67px, 5.67px);",
    );
    item.children[1].setAttribute("style", "transform: scaleX(0);");
    item.children[2].setAttribute(
      "style",
      "transform: rotate(45deg) translate(-5.67px, -5.67px);",
    );
    item.dataset.active = "true";
    menu.classList.add("menu--mobile");
    menu.classList.remove("menu");
  } else if (itemStatus == "true") {
    item.removeAttribute("style");
    for (let child of item.children) {
      child.removeAttribute("style");
    }
    item.dataset.active = "false";
    menu.classList.add("menu");
    menu.classList.remove("menu--mobile");
  }
});

document.addEventListener("click", (event) => {
  let menuItemBtn;
  menuListItem.forEach((item) => {
    if (event.target == item) {
      menuItemBtn = item;
    }
  });
  if (
    (headerBtn.dataset.active == "active") &
    (event.target != headerBox) &
    (event.target != headerBoxTitle) &
    (event.target != headerBoxWrapper) &
    (event.target != header) &
    (event.target != menuItemBtn)
  ) {
    headerBox.classList.remove("active");
    headerBox.children[1].removeAttribute("style");
    headerBtn.dataset.active = "disactive";
  } else if (
    (headerBtn.dataset.active == "disactive") &
    ((event.target == headerBtn) |
      (event.target == btnConnect) |
      (event.target == menuItemBtn) |
      (event.target == headerBtn.children[0].children[0].children[0]))
  ) {
    headerBox.classList.add("active");
    headerBox.children[1].setAttribute("style", "transform: scaleY(1);");
    headerBtn.dataset.active = "active";
  }
});

function convertToCurrency(nameCurrency, count) {
  let result = 0;
  result = currency[nameCurrency] * count;
  return result;
}

function convertToReceive(nameCurrency, count, percent) {
  let result = 0;
  let tollerance = percent * 10;
  result = currency[nameCurrency] * count;
  tollerance = tollerance * (result / 1000);
  result -= tollerance;
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

function convertToDollar(nameCurrency, count) {
  let result = 0;
  result = dolar[nameCurrency] * count;
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

function reduceCurrency() {
  if (selectCurrent.textContent == "TRX") {
    selectReceiveCurrent.textContent = "NXM";
  } else if (selectCurrent.textContent == "NXM") {
    selectReceiveCurrent.textContent = "TRX";
  }
}
selectHeader.forEach((item) => {
  item.addEventListener("click", reduceCurrency);
});
selectItem.forEach((item) => {
  item.addEventListener("click", reduceCurrency);
});

let percent = 0;
calcRadio.forEach((item) => {
  if (item.checked) {
    percent = item.value;
  }
  item.addEventListener("click", () => {
    percent = item.value;
    let tolleranceResult = convertToReceive(
      selectCurrent.textContent,
      payInput.value,
      percent,
    );
    innerTextRows[2].innerHTML = `<span class="calc-text__finally-count">${tolleranceResult.toFixed(
      5,
    )}</span> ${rotateCurrency}`;
    calcRadioInput.value = "";
    calcRadioInput.placeholder = item.value;
  });
});

calcRadioInput.addEventListener("input", (event) => {
  percent = calcRadioInput.value;
  let tolleranceResult = convertToReceive(
    selectCurrent.textContent,
    payInput.value,
    percent,
  );
  innerTextRows[2].innerHTML = `<span class="calc-text__finally-count">${tolleranceResult.toFixed(
    5,
  )}</span> ${rotateCurrency}`;
});

payInput.addEventListener("input", (event) => {
  let target = event.target;
  let nameCurrency = selectCurrent.textContent;

  let result = convertToCurrency(nameCurrency, target.value);
  if (isNaN(result)) {
    result = 0;
  }
  receiveInput.value = result.toFixed(5);
  let tolleranceResult = convertToReceive(nameCurrency, target.value, percent);
  // console.log(tolleranceResult);
  // calcFinnalyCost.textContent = tolleranceResult.toFixed(5);
  // console.log(calcFinnalyCost);
  innerTextRows[2].innerHTML = `<span class="calc-text__finally-count">${tolleranceResult.toFixed(
    5,
  )}</span> ${rotateCurrency}`;
  // console.log("text "+calcFinnalyCost.textContent);
  dolarInput.forEach((item) => {
    item.textContent =
      "≈$" + convertToDollar(nameCurrency, target.value).toFixed(5);
  });

  messageError.setAttribute("style", "display: flex;");
  payInput.closest(".calc-input").classList.add("form-error");

  resetBtn.textContent = "Reset";
  resetBtn.classList.add("reset-btn--error");
});

payInput.addEventListener("keydown", (event) => {
  if (!checkPhoneKey(event.key)) {
    messageError.querySelector(".calc__message-text").textContent =
      "Enter a valid value (e.g. 1999.99).";
    payInput.closest(".calc-input").classList.add("form-error");
  } else {
    messageError.querySelector(".calc__message-text").textContent =
      "Insufficient funds.";
    payInput.closest(".calc-input").classList.add("form-error");
  }
});

calcBtnRotate.addEventListener("click", () => {
  payInput.value = "";
  receiveInput.value = "";
  dolarInput.forEach((item) => {
    item.textContent = "≈$" + 0;
  });
  // calcFinnalyCost.textContent = '0.00000';
  let innerRow1 = innerTextRows[0].innerHTML;
  let innerRow2 = innerTextRows[1].innerHTML;
  innerTextRows[0].innerHTML = innerRow2;
  innerTextRows[1].innerHTML = innerRow1;
  // let rotateCurrency = '';
  if (selectCurrent.textContent == "TRX") {
    selectCurrent.textContent = "NXM";
    rotateCurrency = "TRX";
    selectReceiveCurrent.textContent = "TRX";
  } else if (selectCurrent.textContent == "NXM") {
    selectCurrent.textContent = "TRX";
    rotateCurrency = "NXM";
    selectReceiveCurrent.textContent = "NXM";
  }
  innerTextRows[2].innerHTML = `<span class="calc-text__finally-count">${(0).toFixed(
    5,
  )}</span> ${rotateCurrency}`;

  if (resetBtn.textContent == "Reset") {
    resetBtn.textContent = "Max";
    resetBtn.classList.remove("reset-btn--error");
  }
  payInput.closest(".calc-input").classList.remove("form-error");
  messageError.removeAttribute("style");
  if (messageWarning.hasAttribute("style")) {
    messageWarning.removeAttribute("style");
  } else {
    messageWarning.setAttribute("style", "display: flex;");
  }
});

resetBtn.addEventListener("click", () => {
  payInput.value = "";
  receiveInput.value = "";
  calcFinnalyCost.textContent = "0.0000";
  dolarInput.forEach((item) => {
    item.textContent = "≈$" + 0;
  });
  payInput.closest(".calc-input").classList.remove("form-error");
  messageError.removeAttribute("style");
  if (resetBtn.textContent == "Reset") {
    resetBtn.textContent = "Max";
    resetBtn.classList.remove("reset-btn--error");
  } else if (resetBtn.textContent == "Max") {
    resetBtn.textContent = "Reset";
    resetBtn.classList.add("reset-btn--error");
  }
});

payInput.addEventListener("focus", () => {
  payInput.closest(".calc-input").classList.add("form-success");
});
payInput.addEventListener("blur", () => {
  payInput.closest(".calc-input").classList.remove("form-success");
});

function checkPhoneKey(key) {
  return (
    (key >= "0" && key <= "9") ||
    key == "." ||
    key == "Backspace" ||
    key == "Delete"
  );
}

calcRadioInput.addEventListener("input", () => {
  calcRadio.forEach((item) => {
    item.removeAttribute("checked");
  });
  if (calcRadioInput.value >= 5) {
    messageWarning.setAttribute("style", "display: flex;");
    calcRadioInput.classList.add("form-warning");
  } else {
    calcRadioInput.classList.remove("form-warning");
  }
});

calcRadioInput.addEventListener("keydown", (event) => {
  if (!checkPhoneKey(event.key)) {
    messageError.querySelector(".calc__message-text").textContent =
      "Enter a valid slippage percentage.";
    messageError.setAttribute("style", "display: flex;");
  } else {
    messageError.removeAttribute("style");
  }
});
