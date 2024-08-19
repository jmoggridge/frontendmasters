let leftValue;
let rightValue;
let operation;
const display = document.querySelector('.display');

// if digit pressed,  create a new value or concatenate to current value
document
  .querySelectorAll('.digit')
  .forEach((b) => b.addEventListener('click', () => handleDigit(b)));

// clear everything when C is clicked

document
  .querySelectorAll('.operator')
  .forEach((op) => op.addEventListener('click', () => handleOperator(op)));

document.querySelector('.clear').addEventListener('click', () => clearAll());
document.querySelector('.equals').addEventListener('click', handleEquals);
document.querySelector('.back').addEventListener('click', handleBackspace);

function handleBackspace() {
  const inner = display.innerHTML;
  if (inner === rightValue) {
    rightValue = trimLast(rightValue);
    display.innerHTML = rightValue;
    return;
  }
  if (inner === leftValue) {
    leftValue = trimLast(leftValue);
    display.innerHTML = leftValue;
  }
}

function trimLast(x) {
  return x.substring(0, x.length - 1);
}
function handleEquals() {
  if (!leftValue || !operation || !rightValue) {
    console.log('invalid calc');
    log();
    return;
  }
  const solution = compute(leftValue, operation, rightValue);
  display.innerHTML = solution;
  leftValue = solution;
  rightValue = null;
  operation = null;
  log();
}
function handleOperator(op) {
  // store the operation if there is no right value
  operation = op.innerHTML;
  if (!rightValue) {
    display.innerHTML = null;
    log();
    return;
  }

  // if there is a right value, compute the expression and store in left, free right value for next digit
  leftValue = compute(leftValue, operation, rightValue);
  display.innerHTML = leftValue;
  rightValue = null;
  log();
  return;
}

function compute(left, operation, right) {
  let [a, b] = [Number.parseInt(left), Number.parseInt(right)];
  let solution;
  switch (operation) {
    case '+':
      solution = plus(a, b);
      break;
    case '-':
      solution = minus(a, b);
      break;
    case 'x':
      solution = product(a, b);
      break;
    case '÷':
      solution = quotient(a, b);
      break;
  }
  return solution;
}
function plus(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
function product(a, b) {
  return a * b;
}
function quotient(a, b) {
  return a / b;
}
function clearAll() {
  leftValue = null;
  operation = null;
  rightValue = null;
  display.innerHTML = null;
}
function handleDigit(b) {
  if (leftValue && !operation) {
    leftValue += b.innerHTML;
    display.innerHTML = leftValue;
    log();
    return;
  }
  if (!leftValue) {
    leftValue = b.innerHTML;
    display.innerHTML = leftValue;
    log();
    return;
  }
  if (leftValue && operation && rightValue) {
    rightValue += b.innerHTML;
    display.innerHTML = rightValue;
    log();
    return;
  }
  if (leftValue && operation && !rightValue) {
    rightValue = b.innerHTML;
    display.innerHTML = rightValue;
    log();
    return;
  }
}
function log() {
  console.table({ leftValue, operation, rightValue });
}
