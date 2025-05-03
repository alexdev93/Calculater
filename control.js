class Calculator {
  constructor(currentEl, previousEl) {
    this.currentEl = currentEl;
    this.previousEl = previousEl;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operator = null;
    this.updateDisplay();
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(num) {
    this.current += num;
    this.updateDisplay();
  }

  chooseOperator(op) {
    if (!this.current) return;
    if (this.previous) this.compute();
    this.operator = op;
    this.previous = this.current;
    this.current = "";
    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;

    const ops = {
      "+": prev + curr,
      "-": prev - curr,
      "*": prev * curr,
      "/": prev / curr,
    };

    this.current = ops[this.operator] ?? this.current;
    this.operator = null;
    this.previous = "";
    this.updateDisplay(true);
  }

  updateDisplay(isResult = false) {
    this.currentEl.innerText = this.current;
    this.previousEl.innerText = this.previous;
    this.currentEl.style.color = isResult ? "grey" : "white";
  }
}

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
