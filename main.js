let screen = document.querySelector(".screen .input");
let screenOutput = document.querySelector(".screen .output");
let arithmeticSigns = ["+", "-", "*", "/"];
let backSpaceBtn = document.getElementById("backSpace");
let equalBtn = document.querySelector(".equal");
// create numberss
for (i = 1; i < 10; i++) {
  let row = document.querySelector(`.row${2 + Math.floor((i - 1) / 3)}`);
  let lastElm = row.lastElementChild;
  let button = document.createElement("button");
  button.setAttribute("class", "number");
  button.innerText = i;
  row.insertBefore(button, lastElm);
}

// buttons event listener
let buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  if (btn.innerText == "Ac") {
    btn.addEventListener("click", clearScreen);
  } else if (btn.innerText == "=") {
    btn.addEventListener("click", function () {
      evaluate();
    });
  } else if (btn == backSpaceBtn) {
    btn.addEventListener("click", backSpace);
  } else btn.addEventListener("click", addToScreen);
});

// functions
let intervalId;
function highlightBtn(btn) {
  btn.classList.add("pressed");
}

function highlightBtnWhite(btn) {
  btn.classList.add("pressedWhite");
}

function addToScreen() {
  highlightBtn(this);
  setTimeout(() => this.classList.remove("pressed"), 100);

  let inputs = screen.innerText.split(" ");
  if (this.innerText == ".") if (containDots(inputs[inputs.length - 1])) return;

  if (checkSpace(inputs, this.innerText)) {
    screen.innerText += ` ${this.innerText} `;
  } else {
    screen.innerText += this.innerText;
  }
}
function containDots(elm) {
  return elm.includes(".");
}
function checkSpace(arr, btnValue) {
  if (arithmeticSigns.includes(btnValue)) {
    if (isNaN(arr[arr.length - 1]) || arr[arr.length - 1] == "") return false;
    else return true;
  }
  return false;
}
function clearScreen() {
  highlightBtnWhite(this);
  setTimeout(() => this.classList.remove("pressedWhite"), 100);
  screen.innerText = "";
  screenOutput.innerText = "";
}
function backSpace() {
  highlightBtn(this);
  setTimeout(() => this.classList.remove("pressed"), 100);
  screen.innerText = screen.innerText.slice(0, -1);
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
  highlightBtnWhite(equalBtn);
  setTimeout(() => equalBtn.classList.remove("pressedWhite"), 100);
  let inputsArr = input.split(" ");

  removeSignsFromEnd(inputsArr);
  screen.innerText = inputsArr.join(" ");
  multiplyDivide(inputsArr);
  plusMinus(inputsArr);

  let output = (+inputsArr[0]).toFixed(6);
  if (isNaN(output)) {
    screenOutput.innerText = "error";
    return;
  }
  screenOutput.innerText = +output;
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

function removeSignsFromEnd(arr) {
  if (arithmeticSigns.includes(arr[arr.length - 1])) {
    arr.pop();
    removeSignsFromEnd(arr);
  }
}
//  prevent over flow

let resizeObs = new ResizeObserver(fixOverFlow);
let screenParent = screen.parentElement;
let parentWidth = window.getComputedStyle(screenParent).width.slice(0, -2);
function fixOverFlow() {
  let width = window.getComputedStyle(screen).width.slice(0, -2);
  if (+width >= +parentWidth) {
    screen.classList.add("overFlow");
  } else if (+width < 0.8 * +parentWidth) screen.classList.remove("overFlow");
}

resizeObs.observe(screen);
