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
