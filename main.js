import { Calculator } from "./Calculator.js";

// ==== DOM Setup ====
const calc = new Calculator(
  document.querySelector(".currentOperand"),
  document.querySelector(".previousOperand")
);

const addClick = (selector, callback) => {
  document
    .querySelectorAll(selector)
    .forEach((el) =>
      el.addEventListener("click", () => callback(el.innerText))
    );
};

addClick(".number", (num) => calc.appendNumber(num));
addClick(".operation", (op) => calc.chooseOperator(op));

document
  .querySelector("[equal]")
  .addEventListener("click", () => calc.compute());
document.querySelector("[clear]").addEventListener("click", () => calc.clear());
document.querySelector("[del]").addEventListener("click", () => calc.delete());
