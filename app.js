// VARIABLE DECLARATIONS //
let firstInput = [];
let secondInput = [];
let firstNumber = 0;
let secondNumber = 0;
let operator = "";
let answer = "";
let result = document.querySelector(".result");
const warning = document.createElement("span");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

// default display
result.textContent = firstNumber;

// FUNCTIONS //
// basic math operators
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
  if (b !== 0) {
    return a / b;
  } else {
    warning.classList.add("warning");
    warning.textContent = "Can't divide by zero!";
    clear();
    result.textContent = "";
    result.appendChild(warning);
  }
};

// main operate function
const operate = function (operator, a, b) {
  switch (operator) {
    case "add":
      return (answer = add(a, b));
    case "subtract":
      return (answer = subtract(a, b));
    case "multiply":
      return (answer = multiply(a, b));
    case "divide":
      return (answer = divide(a, b));
  }
};

// disable operator button
const disableOperator = function () {
  document.querySelectorAll(".operator").forEach((button) => {
    button.disabled = true;
  });
};

// enable operator button
const enableOperator = function () {
  document.querySelectorAll(".operator").forEach((button) => {
    button.disabled = false;
  });
};

// disable decimal button
const disableDecimal = function () {
  document.querySelector(".decimal").disabled = true;
};

// enable decimal button
const enableDecimal = function () {
  document.querySelector(".decimal").disabled = false;
};

// display answer and ready for more inputs
const displayAnswer = function () {
  operate(String(operator), firstNumber, secondNumber);
  if (typeof answer === "number") {
    result.textContent = Math.round(answer * 100) / 100;
    firstNumber = answer;
  }
  firstInput = [];
  secondInput = [];
  operator = "";
  answer = "";
  enableOperator();
  enableDecimal();
};

// clear calculator
const clear = function () {
  firstInput = [];
  secondInput = [];
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  answer = "";
  enableDecimal();
  result.textContent = firstNumber;
};

// backspace button
const backspace = function () {
  if (secondInput.length === 0) {
    firstInput.pop();
    firstNumber = Number(firstInput.join(""));
    result.textContent = firstNumber;
  } else {
    secondInput.pop();
    secondNumber = Number(secondInput.join(""));
    result.textContent = secondNumber;
  }
};

// capture number inputs
const captureNumber = function (button) {
  if (!operator) {
    firstInput.push(button.value);
    // prevent multiple decimal button inputs
    if (firstInput.includes(".")) {
      disableDecimal();
    }
    firstNumber = Number(firstInput.join(""));
    result.textContent = firstNumber;
    enableOperator();
  } else if (operator && !answer) {
    secondInput.push(button.value);
    // prevent multiple decimal button inputs
    if (secondInput.includes(".")) {
      disableDecimal();
    }
    secondNumber = Number(secondInput.join(""));
    result.textContent = secondNumber;
    enableOperator();
  } else {
    result.textContent = "Number capture error.";
  }
};

// caputure operator selection
const captureOperator = function (button) {
  if (operator) {
    displayAnswer();
  }
  operator = button.value;
  disableOperator(); // prevent consecutive operator button clicks
  enableDecimal();
};

// LISTEN FOR EVENTS //
// listen for "number" button clicks
numberButtons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    captureNumber(button);
  });
});
// listen for "operator" button clicks
operatorButtons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    captureOperator(button);
  });
});
// listen for "clear" button click
clearButton.addEventListener("click", clear, false);
// listen for "bksp" button click
backspaceButton.addEventListener("click", backspace, false);
// listen for "equals" button click
equalsButton.addEventListener("click", displayAnswer, false);

/** BUGS OR TO-DO
 * -
 * -
 * */
