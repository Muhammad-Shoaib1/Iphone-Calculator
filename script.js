const display = document.getElementById("display");
let expression = "";

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener('click', (e) => handleInput(e.target.innerHTML));
});

function handleInput(input) {
  switch (input) {
    case '=':
      calculateResult();
      break;
    case 'C':
      clearDisplay();
      break;
    case '±':
      toggleSign();
      break;
    case '%':
      calculatePercentage();
      break;
    default:
      processInput(input);
      break;
  }
}

function calculateResult() {
  try {
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    expression = eval(expression).toString();
    display.value = expression;
  } catch (error) {
    display.value = "Error";
    expression = "";
  }
}

function clearDisplay() {
  expression = "";
  display.value = expression;
}

function toggleSign() {
  if (expression) {
    expression = expression.startsWith('-') ? expression.slice(1) : '-' + expression;
    display.value = expression;
  }
}

function calculatePercentage() {
  expression = (parseFloat(expression) / 100).toString();
  display.value = expression;
}

function processInput(input) {
  const operators = ['+', '-', '*', '/'];
  const lastChar = expression[expression.length - 1];

  if (operators.includes(input)) {
    if (expression === "" && input !== '-') return;
    if (operators.includes(lastChar)) expression = expression.slice(0, -1);
  }

  expression += input;
  display.value = expression;
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;
  const keyMapping = {
    'Enter': '=',
    'Escape': 'C',
    'Backspace': 'C',
    '.': '.',
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷',
    '%': '%',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9'
  };

  if (key in keyMapping) {
    handleInput(keyMapping[key]);
  }
});
