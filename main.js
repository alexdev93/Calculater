import { Calculator } from "./Calculator.js";
import { keyBindings } from "./utils.js";

// ==== DOM Setup ====
const calc = new Calculator(
  document.querySelector(".currentOperand"),
  document.querySelector(".previousOperand")
);

// === Utility: Add click listeners in a DRY way ===
const addClick = (selector, callback) => {
  document
    .querySelectorAll(selector)
    .forEach((el) =>
      el.addEventListener("click", () => callback(el.innerText))
    );
};

// === Click Bindings ===
addClick(".number", calc.appendNumber.bind(calc));
addClick(".operation", calc.chooseOperator.bind(calc));

document
  .querySelector("[equal]")
  .addEventListener("click", () => calc.compute());
document.querySelector("[clear]").addEventListener("click", () => calc.clear());
document.querySelector("[del]").addEventListener("click", () => calc.delete());

// History logic
const historyBtn = document.querySelector(".history-btn");
const calculatorUI = document.querySelector(".calculator");
const historyContainer = document.querySelector(".history-container");
const historyList = document.getElementById("historyList");
const backBtn = document.getElementById("backBtn");

// === Keyboard Bindings ===
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    calc.appendNumber(key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    calc.chooseOperator(key);
  } else if (keyBindings[key]) {
    const action = keyBindings[key];
    if (action === "equal") calc.compute();
    else if (action === "clear") calc.clear();
    else if (action === "del") calc.delete();
    else calc.chooseOperator(action);
  }
});

// Save to history after each compute
const originalCompute = calc.compute.bind(calc);
calc.compute = () => {
  originalCompute();
  const result = calc.result;
  const li = document.createElement("li");
  li.textContent = result;
  historyList.prepend(li);
};

// Show history
historyBtn.addEventListener("click", () => {
  historyContainer.classList.add("visible");
});

backBtn.addEventListener("click", () => {
  historyContainer.classList.remove("visible");
});