// utils.js

export const displayMap = {
  "+": (a, b) => `${a} + ${b}`,
  "-": (a, b) => `${a} - ${b}`,
  "*": (a, b) => `${a} × ${b}`,
  "/": (a, b) => `${a} ÷ ${b}`,
  "√": (_, b) => `√(${b})`,
  "x²": (_, b) => `(${b})²`,
  "%": (a, b) => `${b}% of ${a}`,
};

export const binaryOperators = ["+", "-", "*", "/", "%"];
export const unaryOperators = ["√", "x²"];

export const keyBindings = {
  Enter: "equal",
  "=": "equal",
  Backspace: "del",
  Escape: "clear",
  r: "√",
  "^": "x²",
  "%": "%",
};
