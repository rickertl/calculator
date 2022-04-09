// basic math operators functions
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

// declare variables
let firstInput = [];
let secondInput = [];
let firstNumber = "";
let secondNumber = "";
let operator = "";
let answer = "";
let result = document.querySelector(".result");

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
const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", backspace, false);

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
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clear, false);

// listen for "number" button clicks
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
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
  });
});

// listen for "operator" button clicks
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    // check if pressing operator before first inputs collected
    if (firstInput.length === 0 && !firstNumber) {
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
  });
});

// listen for "equals" button click
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
  // check if pressing equal before all inputs collected
  if (secondInput.length === 0) {
    clear();
  } else {
    displayAnswer();
  }
});

/** BUGS OR TO-DO
 * - zero issue: 3 - 3 + 3 = is showing zero???
 * */
