// VARIABLE DECLARATIONS //
let firstInput = [];
let secondInput = [];
let firstNumber = "";
let secondNumber = "";
let operator = "";
let answer = "";
let result = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

// FUNCTIONS //
// basic math operators
const add = function (a, b) {
  return Number(a) + Number(b);
};

const subtract = function (a, b) {
  return Number(a) - Number(b);
};

const multiply = function (a, b) {
  return Number(a) * Number(b);
};

const divide = function (a, b) {
  if (Number(b) === 0) {
    return (result.textContent = `Can't divide by 0!!!`);
  } else {
    return Number(a) / Number(b);
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

// disable operator button. prevent consecutive operator button clicks.
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

// disable decimal button. prevent consecutive decimal button clicks.
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
  if (typeof answer === "string") {
    result.textContent = answer;
  } else {
    result.textContent = Math.round(answer * 100) / 100;
  }
  firstNumber = answer;
  firstInput = [];
  secondInput = [];
  operator = "";
  answer = "";
  enableOperator();
  enableDecimal();
};

// clear calculator
const clear = function () {
  result.textContent = "0";
  firstInput = [];
  secondInput = [];
  firstNumber = "";
  secondNumber = "";
  operator = "";
  answer = "";
  enableDecimal();
};

// backspace button
const backspace = function () {
  if (secondInput.length === 0) {
    firstInput.pop();
    firstNumber = firstInput.join("");
    result.textContent = firstNumber;
  } else {
    secondInput.pop();
    secondNumber = secondInput.join("");
    result.textContent = secondNumber;
  }
};

// capture number inputs
const captureNumber = function (button) {
  if (!operator) {
    firstInput.push(button.value);
    if (firstInput.includes(".")) {
      disableDecimal();
    }
    firstNumber = firstInput.join("");
    result.textContent = firstNumber;
    enableOperator();
  } else if (operator && !answer) {
    secondInput.push(button.value);
    if (secondInput.includes(".")) {
      disableDecimal();
    }
    secondNumber = secondInput.join("");
    result.textContent = secondNumber;
    enableOperator();
  } else {
    result.textContent = "Number button error.";
  }
};

// caputure operator selection
const captureOperator = function (button) {
  if (firstInput.length === 0 && firstNumber === null) {
    // use "=== null" instead of !firstNumber bc 1st # could be zero
    return clear();
  } else if (operator) {
    displayAnswer();
    operator = button.value;
    disableOperator();
  } else {
    operator = button.value;
    disableOperator();
  }
  enableDecimal();
};

// equals button. display answer.
const equals = function () {
  // check if pressing equal before all inputs collected
  if (secondInput.length === 0) {
    clear();
  } else {
    displayAnswer();
  }
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
equalsButton.addEventListener("click", equals, false);

/** BUGS OR TO-DO
 * -
 * */
