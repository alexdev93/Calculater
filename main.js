import { Calculator } from "./Calculator.js";

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

// === Keyboard Bindings ===
const keyMap = {
  // Digits & dot
  ...Object.fromEntries(
    "0123456789.".split("").map((k) => [k, () => calc.appendNumber(k)])
  ),

  // Basic operators
  "+": () => calc.chooseOperator("+"),
  "-": () => calc.chooseOperator("-"),
  "*": () => calc.chooseOperator("*"),
  "/": () => calc.chooseOperator("/"),

  // Special operations
  r: () => calc.chooseOperator("√"), // r = root
  "^": () => calc.chooseOperator("x²"), // ^ = square
  "%": () => calc.chooseOperator("%"), // % = percentage

  // Control keys
  Enter: () => calc.compute(),
  "=": () => calc.compute(),
  Escape: () => calc.clear(),
  Backspace: () => calc.delete(),
};

document.addEventListener("keydown", (e) => {
  const handler = keyMap[e.key];
  if (handler) handler();
});

// History logic
const historyBtn = document.querySelector(".history-btn");
const calculatorUI = document.querySelector(".calculator");
const historyContainer = document.querySelector(".history-container");
const historyList = document.getElementById("historyList");
const backBtn = document.getElementById("backBtn");

// Save to history after each compute
const originalCompute = calc.compute.bind(calc);
calc.compute = () => {
  const prev = calc.previous;
  const op = calc.operator;
  const curr = calc.current;
  originalCompute();
  if (prev || ["√", "x²", "%"].includes(op)) {
    const result = calc.current;
    const entry = ["√", "x²", "%"].includes(op)
      ? `${op}(${curr}) = ${result}`
      : `${prev} ${op} ${curr} = ${result}`;
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li);
  }
};

// Show history
historyBtn.addEventListener("click", () => {
  calculatorUI.classList.add("hidden");
  historyContainer.classList.remove("hidden");
});

// Back to calculator
backBtn.addEventListener("click", () => {
  historyContainer.classList.add("hidden");
  calculatorUI.classList.remove("hidden");
});
