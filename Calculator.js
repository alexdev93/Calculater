import { displayMap, binaryOperators, unaryOperators } from "./utils.js";
export class Calculator {
  constructor(currentEl, previousEl) {
    this.currentEl = currentEl;
    this.previousEl = previousEl;

    this.clear();
  }

  clear() {
    this.current = "0";
    this.previous = "";
    this.operator = null;
    this.display = "";
    this.updateDisplay();
  }

  delete() {
    this.current = this.current.toString().slice(0, -1) || "0";
    this.updateDisplay();
  }

  appendNumber(num) {
    this.current = this.current === "0" ? num : this.current + num;
    this.updateDisplay();
  }

  chooseOperator(op) {
    if (!this.current && !unaryOperators.includes(op)) return;

    if (
      this.previous &&
      this.operator &&
      binaryOperators.includes(this.operator)
    ) {
      this.compute();
    }

    if (unaryOperators.includes(op)) {
      this.operator = op;
      this.compute();
      return;
    }

    this.operator = op;
    this.previous = this.current;
    this.current = "";
    this.display = `${this.previous} ${this.operator}`;
    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);

    if (binaryOperators.includes(this.operator) && (isNaN(prev) || isNaN(curr)))
      return;
    if (unaryOperators.includes(this.operator) && isNaN(curr)) return;

    const ops = {
      "+": parseFloat(prev + curr),
      "-": parseFloat(prev - curr),
      "*": parseFloat(prev * curr),
      "/": parseFloat(prev / curr),
      "%": parseFloat((prev * curr) / 100),
      "√": parseFloat(Math.sqrt(curr)),
      "x²": parseFloat(Math.pow(curr, 2)),
    };

    const result =
      typeof ops[this.operator] === "function"
        ? ops[this.operator](prev, curr)
        : ops[this.operator];

    const formatted =
      displayMap[this.operator]?.(this.previous, this.current) ??
      `${this.previous} ${this.operator} ${this.current}`;

    this.display = formatted;
    this.current = result;
    this.previous = "";
    this.operator = null;

    this.result = `${formatted} = ${result}`;

    this.updateDisplay();
  }

  updateDisplay() {
    this.currentEl.innerText = this.current;
    this.previousEl.innerText = this.display ?? "";
  }
}
