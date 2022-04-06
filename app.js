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
  if (b == 0) {
    return (result.textContent = `Can't divide by zero!!!`);
  } else {
    let answer = a / b;
    return answer.toFixed(2);
  }
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
  result.textContent = "0";
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
      // check if pressing operator before first inputs collected
      if (firstInput.length === 0) {
        return clear();
      }
      operator = button.value;
    } else if (button.classList.contains("equals")) {
      // check if pressing equal before all inputs collected
      if (secondInput.length === 0) {
        return clear();
      }
      result.textContent = operate(
        String(operator),
        firstInput.join(""),
        secondInput.join("")
      );
    }
  });
});
