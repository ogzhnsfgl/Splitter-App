const billAmount = document.querySelector(".input-bill");
const btnCustom = document.querySelector(".btn-custom");
const btnCustomText = document.querySelector(".custom-text");
const btnCustomInput = document.querySelector(".custom-input");
const peopleNumber = document.querySelector(".input-people");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total");
const btnContainer = document.querySelector(".tip-buttons-container");

let tipRate = 0.05;

/* Event listeners */
document.querySelector(".input-bill").addEventListener("keyup", calculateTip);
document.querySelector(".input-people").addEventListener("keyup", calculateTip);
document
  .querySelector(".custom-input")
  .addEventListener("keyup", customTipRateCalc);
document
  .querySelector(".tip-buttons-container")
  .addEventListener("click", setTipRate);

document.querySelector(".btn-reset").addEventListener("click", reset);

function calculateTip(e) {
  if (
    peopleNumber.value != "0" &&
    peopleNumber.value != "" &&
    billAmount.value != 0 &&
    billAmount.value != ""
  ) {
    resultTip = ((billAmount.value * tipRate) / peopleNumber.value).toFixed(2);

    tipAmount.innerHTML = `$${resultTip}`;
    totalAmount.innerHTML = `$${(
      (parseFloat(billAmount.value) + parseFloat(resultTip)) /
      peopleNumber.value
    ).toFixed(2)}`;
  }
}

function setTipRate(e) {
  btnColorChanger(e);
  if (
    e.target.innerHTML == "Custom" ||
    e.target.classList.contains("custom-input") ||
    e.target.classList.contains("custom-text") ||
    e.target.classList.contains("custom-input") ||
    e.target.classList.contains("btn-custom")
  ) {
    showCustomTipInput();
    if (btnCustomInput !== "") {
      tipRate = btnCustomInput.value / 100;
      calculateTip();
    }

    return;
  } else {
    btnCustomInput.classList.remove("active");
    btnCustomText.classList.remove("hide");
    btnContainer.lastElementChild.classList.remove("btn-active");
    btnColorChanger(e);
    if (parseInt(e.target.innerHTML)) {
      tipRate = e.target.innerHTML / 100;
      calculateTip();
    }
  }
}

function showCustomTipInput() {
  /* SHOW INPUT */
  //   debugger;
  if (!btnCustomInput.classList.contains("active")) {
    btnContainer.lastElementChild.classList.add("btn-active");
    btnCustomInput.classList.add("active");
    btnCustomText.classList.add("hide");
    document.querySelector(".custom-input").focus();
  }
}
function customTipRateCalc(e) {
  tipRate = e.target.value / 100;
  calculateTip();
}

function btnColorChanger(e) {
  if (e.target.tagName === "DIV") {
    return;
  }
  let activeButton = document.querySelector(".btn-active");
  if (e.target.tagName === "BUTTON") {
    activeButton.classList.remove("btn-active");
    e.target.classList.add("btn-active");
  }
  if (e.target.tagName === "SPAN") {
    btnContainer.lastElementChild.classList.add("btn-active");
    activeButton.classList.remove("btn-active");
  }
}

function reset() {
  billAmount.value = "0";
  peopleNumber.value = 1;
  btnCustomInput.value = 0;
  let activeButton = document.querySelector(".btn-active");
  activeButton.classList.remove("btn-active");
  btnCustomInput.classList.remove("active");
  btnCustomText.classList.remove("hide");
  btnContainer.firstElementChild.classList.add("btn-active");
  tipRate = 0.05;
  tipAmount.innerHTML = `$0.00`;
  totalAmount.innerHTML = `$0.00`;
}
