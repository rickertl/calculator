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
  return a / b;
};

// main operate function
const operate = function (operator, a, b) {
  return operator(a, b);
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    console.log(button.value);
  });
});
