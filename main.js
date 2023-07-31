// create numbers
const BUTTONS = document.querySelector(".buttons");
for (i = 1; i < 10; i++) {
  let row = document.querySelector(`.row${2 + Math.floor((i - 1) / 3)}`);
  let lastElm = row.lastElementChild;
  let button = document.createElement("button");
  button.setAttribute("class", "number");
  button.innerText = i;
  row.insertBefore(button, lastElm);
}
