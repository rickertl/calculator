// basic math operators functions
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  let answer = a / b;
  return answer.toFixed(2);
};

// main operate function
const operate = function (operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
};

// declare variables
let firstInput = [];
let secondInput = [];
let operator = "";
let result = document.querySelector(".result");

// clear calculator
const clear = function () {
  result.textContent = "";
  firstInput = [];
  secondInput = [];
  operator = "";
};

// listen for button clicks
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    if (button.value === "clear") {
      clear();
    } else if (!operator && !button.classList.contains("operator")) {
      firstInput.push(button.value);
      result.textContent = firstInput.join("");
    } else if (operator && !button.classList.contains("operator")) {
      secondInput.push(button.value);
      result.textContent = secondInput.join("");
    } else if (
      button.classList.contains("operator") &&
      !button.classList.contains("equals")
    ) {
      operator = button.value;
    } else if (button.classList.contains("equals")) {
      result.textContent = operate(
        String(operator),
        firstInput.join(""),
        secondInput.join("")
      );
    }
  });
});
