let operation = "";
let decimal_enabled = false;
let first_number = null;
let second_number = null;
let displayOutput = document.getElementById("calc_display_input"); // global variable to hold the value displayed on the screen.

document.querySelectorAll(".operation").forEach(curOperation => {
    curOperation.addEventListener("click", function(){
        setOperation(curOperation.textContent);         // Set onclick operation for each Operation button with a parameter containing button's value.
    });
});

document.querySelectorAll(".number").forEach(curNumber => {
    curNumber.addEventListener("click", function(){      // Set onclick operation for each Number button with a parameter containing button's value.
        setNumber(curNumber.textContent);
    });
});

window.addEventListener("keydown",validateKey);     // keydown operation for Keyboard handling.

function setOperation(curOperation){
    switch(curOperation){
        case "AC":          // Clear all numeric values and operations.
            clearAll();
            displayOutput.value = "";
            break;

        case "back":        // Remove last entered digit
            deleteNumber();
            break;

        case ".":           // Add decimal values
            if(decimal_enabled == false){       // To prevent input of multiple decimal points, decimal point is added to calculator
                decimal_enabled = true;         // display only when the flag (decimal_enabled) is false.
                displayOutput.value+= ".";
            }
            break;

        case "=":
            performEvaluation();            // Evaluate the given numeric values along with the operation.
            break;

        default:
            operation = curOperation;       // Value for global variable - operation, is set.
            decimal_enabled = false;        // The flag (decimal_enabled) is set as false, so that decimal values can be input for second numeric value.
            first_number = displayOutput.value;   // First numeric value is set with value displayed in calculator.
    }
}

function setNumber(currentNumber){
    if(displayOutput.value.length == 10){         // Maximum of 10 numbers are allowed.
        return;
    }
    if(operation == ""){                    // Case where first numeric value is being input.
        if(first_number == null){           // Case where first digit of the first numeric value is being input.
            displayOutput.value = ""
        }
        displayOutput.value+= currentNumber;      // The number which is clicked/pressed on keyboard is added to calculator display.
        alert(displayOutput.value);
    } else{
        if(first_number != null){           // Case where first numeric value has already been input.
            if(second_number == null){      // Case where first digit of the second numeric value is being input.
                displayOutput.value = ""
            }
            displayOutput.value+= currentNumber;  // The number which is clicked/pressed on keyboard is added to calculator display.
        }
    }
}

function clearAll(){
    first_number = null;
    second_number = null;
    operation = "";
}

function deleteNumber() {
    let currentValue = ""; currentValue = displayOutput.value;
    currentValue = currentValue.slice(0,currentValue.length - 1); // Last digit of current calculator display will be removed using slice operation.
    displayOutput.value = currentValue ;
}

function performEvaluation(){
    let tmpOutput = 0;
    second_number = displayOutput.value;          // Second numeric value is set with value displayed in calculator.
    switch(operation){
        case "+":
            tmpOutput = first_number + second_number;
            break;
        
        case "-":
            tmpOutput = first_number - second_number;
            break;
        
        case "/":
            tmpOutput = first_number / second_number;
            break;

        case "*":
            tmpOutput = first_number * second_number;
            break;

        case "%":
            tmpOutput = first_number % second_number;
            break;
    }
    if(tmpOutput.length <= 10){
        displayOutput.value = tmpOutput;      // Output will be posted to the calculator display.
        clearAll();
    }
}

function validateKey(event){
    if(event.key >= "0" && event.key <= "9"){   // Input to add more numbers to the screen
       setNumber(event.key); 
    } else if(event.key == "=" || event.key == "Enter"){    // Input to evaluate the expression based on numbers input and the operation
        performEvaluation();
    } else if(event.key == "Backspace"){        // Input to clear the last digit of current number.
        deleteNumber();       
    } else if(event.key == "." || event.key == "-" || event.key == "+" || event.key == "*" || event.key == "/" || event.key == "%"){
        setOperation(event.key);                // Input to handle the various calculator operations.
    } 
}

/*
1. Decimal Numbers
2. Max Numbers in Output
3. Backspace
4. Keyboard Input
5. Multiplication
6. Errors & Warnings
7. Fix Colors
*/