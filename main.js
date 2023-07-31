let screen = document.querySelector(".screen");

// create numberss
for (i = 1; i < 10; i++) {
  let row = document.querySelector(`.row${2 + Math.floor((i - 1) / 3)}`);
  let lastElm = row.lastElementChild;
  let button = document.createElement("button");
  button.setAttribute("class", "number");
  button.innerText = i;
  row.insertBefore(button, lastElm);
}

// register numbers to screen
let buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  if (btn.innerText == "Ac") {
    btn.addEventListener("click", clearScreen);
  } else if (btn.innerText == "=") {
    btn.addEventListener("click", evaluate);
  } else btn.addEventListener("click", addToScreen);
});

// functions
function addToScreen() {
  let arithmeticSigns = ["+", "-", "*", "/"];
  let previousInput = screen.innerText.slice(-1);
  if (
    arithmeticSigns.includes(this.innerText) ||
    arithmeticSigns.includes(previousInput)
  ) {
    screen.innerText += ` ${this.innerText} `;
  } else {
    screen.innerText += this.innerText;
  }
}
function clearScreen() {
  screen.innerText = "";
}
function add(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function evaluate() {}
