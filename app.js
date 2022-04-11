// VARIABLE DECLARATIONS //
let firstInput = [];
let secondInput = [];
let firstNumber = 0;
let secondNumber = 0;
let operator = "";
let answer = "";
let roundedAnswer = "";
let result = document.querySelector(".result");
const warning = document.createElement("span");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

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
  return a / b;
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

// disable/enable button state(s)
const toggleButtonState = function (button, action) {
  if (button === operatorButtons) {
    operatorButtons.forEach((button) => {
      action === "disable"
        ? (button.disabled = true)
        : (button.disabled = false);
    });
  } else {
    action === "disable" ? (button.disabled = true) : (button.disabled = false);
  }
};

// clear calculator
const clear = function () {
  firstInput = [];
  secondInput = [];
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  answer = "";
  roundedAnswer = "";
  toggleButtonState(decimalButton, "enable");
  toggleButtonState(equalsButton, "disable");
  toggleButtonState(operatorButtons, "enable");
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
      toggleButtonState(decimalButton, "disable");
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
      toggleButtonState(decimalButton, "disable");
    }
    secondNumber = Number(secondInput.join(""));
    result.textContent = secondNumber;
  }
  toggleButtonState(operatorButtons, "enable"); // once input another number, can use operators again
};

// caputure operator selection
const captureOperator = function (button) {
  if (operator) {
    displayAnswer();
  }
  operator = button.value;
  toggleButtonState(decimalButton, "enable"); // enable here bc now ready for 2nd number input
  toggleButtonState(equalsButton, "enable");
  toggleButtonState(operatorButtons, "disable"); // prevent consecutive operator button clicks
};

// display answer and ready for more inputs
const displayAnswer = function () {
  if (secondNumber === 0 && operator === "divide") {
    warning.classList.add("warning");
    warning.textContent = "Can't divide by zero!";
    clear();
    result.textContent = "";
    result.appendChild(warning);
  } else {
    operate(String(operator), firstNumber, secondNumber);
    roundedAnswer = Math.round(answer * 100) / 100;
    result.textContent = roundedAnswer.toLocaleString("en-US");
    firstNumber = answer;
    firstInput = [];
    secondInput = [];
    operator = "";
    answer = "";
    roundedAnswer = "";
  }
  toggleButtonState(equalsButton, "disable"); // prevent consecutive equals button clicks
};

// LISTEN FOR EVENTS //
// on document load, fire clear function for defaults
window.addEventListener("load", clear, false);
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

// prevent double tap zoom on mobile
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("dblclick", function (e) {
    e.preventDefault();
  });
});

/** BUGS OR TO-DO
 * •
 * •
 * */
