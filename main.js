let screen = document.querySelector(".screen .input");
let screenOutput = document.querySelector(".screen .output");
let arithmeticSigns = ["+", "-", "*", "/"];

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
    btn.addEventListener("click", function () {
      evaluate();
    });
  } else btn.addEventListener("click", addToScreen);
});

// functions
function addToScreen() {
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
  screenOutput.innerText = "";
}
function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}
function minus(a, b) {
  return parseFloat(a) - parseFloat(b);
}
function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}
function divide(a, b) {
  if (b == 0) {
    screenOutput.innerText = "Divide by 0 !!!";
  }
  return parseFloat(a) / parseFloat(b);
}

function evaluate(input = screen.innerText) {
  let inputsArr = input.split(" ");
  removeSignsFromEnd(inputsArr);
  inputsArr = multiplyDivide(inputsArr);
  inputsArr = plusMinus(inputsArr);
  console.log(inputsArr);
  screenOutput.innerText = inputsArr[0];
}

function multiplyDivide(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "*") {
      arr[i + 1] = multiply(arr[i - 1], arr[i + 1]);
      arr.splice(i - 1, 2);
      i--;
    } else if (arr[i] == "/") {
      arr[i + 1] = divide(arr[i - 1], arr[i + 1]);
      arr.splice(i - 1, 2);
      i--;
    }
  }
  return arr;
}

function plusMinus(arr) {
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    if (arr[i] == "+") {
      arr[i + 1] = add(arr[i - 1], arr[i + 1]);
      arr.splice(i - 1, 2);
      i--;
    } else if (arr[i] == "-") {
      arr[i + 1] = minus(arr[i - 1], arr[i + 1]);
      arr.splice(i - 1, 2);
      i--;
    }
  }
  return arr;
}

function removeSignsFromEnd(inputsArr) {
  if (arithmeticSigns.includes(inputsArr[inputsArr.length - 1])) {
    inputsArr.pop();
    screen.innerText = screen.innerText.slice(0, -1);
    removeSignsFromEnd(inputsArr);
  }
}
