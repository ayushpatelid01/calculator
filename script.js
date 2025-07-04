let display = document.getElementById('display');
let input = '';

function removeLast() {
  input = input.slice(0, -1);
  updateDisplay();
}

function appendNumber(num) {
  if (input === '0' && num !== '.') {
    input = num;
  } else {
    input += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (input === '') return;
  const lastChar = input.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    input = input.slice(0, -1) + op;
  } else {
    input += op;
  }
  updateDisplay();
}

function clearDisplay() {
  input = '';
  updateDisplay('0');
}

function calculate() {
  try {
    const result = eval(input);
    input = result.toString();
    updateDisplay();
  } catch {
    updateDisplay('Error');
    input = '';
  }
}

function updateDisplay(value) {
  display.textContent = value || input || '0';
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    appendNumber(key);
  } else if ('+-*/'.includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault(); // Avoid form submission
    calculate();
  } else if (key === 'Backspace') {
    input = input.slice(0, -1);
    updateDisplay();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    clearDisplay();
  } else if (key === '.') {
    appendNumber('.');
  }
});
