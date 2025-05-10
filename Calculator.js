export class Calculator {
  constructor(currentEl, previousEl) {
    this.currentEl = currentEl;
    this.previousEl = previousEl;

    this.binaryOps = ["+", "-", "*", "/"];
    this.unaryOps = ["√", "x²"];

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
    if (!this.current && !this.unaryOps.includes(op)) return;

    if (
      this.previous &&
      this.operator &&
      this.binaryOps.includes(this.operator)
    ) {
      this.compute();
    }

    if (this.unaryOps.includes(op)) {
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

    if (this.binaryOps.includes(this.operator) && (isNaN(prev) || isNaN(curr)))
      return;
    if (this.unaryOps.includes(this.operator) && isNaN(curr)) return;

    const ops = {
      "+": prev + curr,
      "-": prev - curr,
      "*": prev * curr,
      "/": prev / curr,
      "√": Math.sqrt(curr),
      "x²": Math.pow(curr, 2),
    };

    const displayMap = {
      "√": `√(${this.current})`,
      "x²": `(${this.current})²`,
    };

    this.display =
      displayMap[this.operator] ||
      `${this.previous} ${this.operator} ${this.current}`;
    this.current = ops[this.operator] ?? this.current;

    this.operator = null;
    this.previous = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentEl.innerText = this.current;
    this.previousEl.innerText = this.display ?? "";
    this.currentEl.style.color = "white";
  }
}
