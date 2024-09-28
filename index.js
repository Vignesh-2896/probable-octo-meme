let operation = "";
let resetScreenFlag = false; // Flag to check if display is to be reset.
let decimal_enabled = false; // Flag to check if decimal value has been included in current numberic value being input.
let first_number = null;
let second_number = null;
let displayOutput = document.getElementById("calc_display_input"); // global variable to hold the value displayed on the screen.

document.querySelectorAll(".operation").forEach((curOperation) => {
  curOperation.addEventListener("click", function () {
    // Event to set operation for current calculation
    setOperation(curOperation.textContent);
  });
  curOperation.addEventListener("mousedown", function () {
    // Event to change background color of Operation button when mouse click is held on button
    curOperation.style.backgroundColor = "#ffcc00";
  });
  curOperation.addEventListener("mouseup", function () {
    // Event to reset background color of Operation button when mouse click is released from button
    curOperation.style.backgroundColor = "#ff9933";
  });
});

document.querySelectorAll(".number").forEach((curNumber) => {
  curNumber.addEventListener("click", function () {
    // Event to input numbers on to the screen
    setNumber(curNumber.textContent);
  });
  curNumber.addEventListener("mousedown", function () {
    // Event to change background color of Number button when mouse click is held on button.
    curNumber.style.backgroundColor = "#00ffcc";
  });
  curNumber.addEventListener("mouseup", function () {
    // Event to reset background color of Number button when mouse click is released from button.
    curNumber.style.backgroundColor = "#00cc99";
  });
});

window.addEventListener("keydown", validateKey); // keydown operation for Keyboard handling.

function setOperation(curOperation) {
  switch (curOperation) {
    case "AC": // Clear all numeric values and operations.
      clearAll();
      displayOutput.value = "";
      break;

    case "back": // Remove last entered digit
      deleteNumber();
      break;

    case ".": // Add decimal values
      if (!decimal_enabled) {
        // To prevent input of multiple decimal points, decimal point is added to calculator
        decimal_enabled = true; // display only when the flag (decimal_enabled) is false.
        displayOutput.value += ".";
      }
      break;

    case "=":
      performEvaluation(); // Evaluate the given numeric values along with the operation.
      break;

    default:
      if (displayOutput.value != "") {
        if (operation != "") performEvaluation(); // Evaluate current operands if expression contains more than 1 operator.
        operation = curOperation; // Value for global variable - operation, is set.
        decimal_enabled = false; // The flag (decimal_enabled) is set as false, so that decimal values can be input for second numeric value.
        first_number = parseFloat(displayOutput.value); // First numeric value is set with value displayed in calculator.
        resetScreenFlag = true;
      } else {
        displayOutput.value = "Number First !";
        resetScreenFlag = true;
      }
  }
}

function setNumber(currentNumber) {
  if (displayOutput.value.length == 10) {
    // Maximum of 10 numbers are allowed.
    return;
  }
  if (displayOutput.value == "0" || resetScreenFlag) resetScreen(); // Screen reset when zero is already present OR operator was just given OR an evaluation was done.
  displayOutput.value += currentNumber;
}

function clearAll() {
  first_number = null;
  second_number = null;
  operation = "";
}

function deleteNumber() {
  let currentValue = "";
  currentValue = displayOutput.value;
  currentValue = currentValue.slice(0, currentValue.length - 1); // Last digit of current calculator display will be removed using slice operation.
  displayOutput.value = currentValue;
}

function performEvaluation() {
  let tmpOutput = 0;
  second_number = parseFloat(displayOutput.value); // Second numeric value is set with value displayed in calculator.
  switch (operation) {
    case "+":
      tmpOutput = first_number + second_number;
      break;

    case "-":
      tmpOutput = first_number - second_number;
      break;

    case "/":
      if (second_number == 0) {
        tmpOutput = "Infinity !";
        break;
      }
      tmpOutput = first_number / second_number;
      break;

    case "*":
      tmpOutput = first_number * second_number;
      break;

    case "%":
      tmpOutput = first_number % second_number;
      break;
  }
  if (tmpOutput.toString().length <= 10) {
    displayOutput.value = tmpOutput; // Output will be posted to the calculator display.
  } else {
    displayOutput.value = "--ERROR--";
    resetScreenFlag = true;
  }
  clearAll();
  first_number = displayOutput.value;
}

function validateKey(event) {
  if (event.key >= "0" && event.key <= "9") {
    // Input to add more numbers to the screen
    setNumber(event.key);
  } else if (event.key == "=" || event.key == "Enter") {
    // Input to evaluate the expression based on numbers input and the operation
    performEvaluation();
  } else if (event.key == "Backspace") {
    // Input to clear the last digit of current number.
    deleteNumber();
  } else if (
    event.key == "." ||
    event.key == "-" ||
    event.key == "+" ||
    event.key == "*" ||
    event.key == "/" ||
    event.key == "%"
  ) {
    setOperation(event.key); // Input to handle the various calculator operations.
  }
}

function resetScreen() {
  displayOutput.value = "";
  resetScreenFlag = false;
}
