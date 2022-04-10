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

// disable/enable operator button
const toggleOperator = function (action) {
  document.querySelectorAll(".operator").forEach((button) => {
    action === "disable" ? (button.disabled = true) : (button.disabled = false);
  });
};

// disable/enable decimal button
const toggleDecimal = function (action) {
  action === "disable"
    ? (document.querySelector(".decimal").disabled = true)
    : (document.querySelector(".decimal").disabled = false);
};

// display answer and ready for more inputs
const displayAnswer = function () {
  operate(String(operator), firstNumber, secondNumber);
  if (typeof answer === "number") {
    // need this for zero error, otherwise NaN
    result.textContent = Math.round(answer * 100) / 100;
    firstNumber = answer;
  }
  firstInput = [];
  secondInput = [];
  operator = "";
  answer = "";
};

// clear calculator
const clear = function () {
  firstInput = [];
  secondInput = [];
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  answer = "";
  toggleDecimal("enable");
  toggleOperator("enable");
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
    // allows for starting with decimal
    if (firstInput[0] === ".") {
      firstInput.unshift("0");
    }
    // prevent multiple decimal button inputs
    if (firstInput.includes(".")) {
      toggleDecimal("disable");
    }
    firstNumber = Number(firstInput.join(""));
    result.textContent = firstNumber;
  } else {
    secondInput.push(button.value);
    // allows for starting with decimal
    if (secondInput[0] === ".") {
      secondInput.unshift("0");
    }
    // prevent multiple decimal button inputs
    if (secondInput.includes(".")) {
      toggleDecimal("disable");
    }
    secondNumber = Number(secondInput.join(""));
    result.textContent = secondNumber;
    toggleOperator("enable"); //enable here bc once 2nd number, can use operator again
  }
};

// caputure operator selection
const captureOperator = function (button) {
  if (operator) {
    displayAnswer();
  }
  operator = button.value;
  toggleOperator("disable"); // prevent consecutive operator button clicks
  toggleDecimal("enable"); // enable here bc now ready for 2nd number input
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
