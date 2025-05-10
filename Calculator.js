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
    this.updateDisplay();
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(num) {
    this.current = this.current == "0" ? num : this.current + num;
    this.updateDisplay();
  }

  chooseOperator(op) {
    this.display = null;
    if (!this.current) return;
    if (this.previous) this.compute();
    this.operator = op;
    this.previous = this.current;
    this.display = `${this.current} ${this.operator}`;
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

    this.display = `${this.previous} ${this.operator} ${this.current}`;

    this.current = ops[this.operator] ?? this.current;
    const op = this.operator;
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
