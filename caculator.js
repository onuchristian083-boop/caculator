const display = document.getElementById("result");
let firstNumber = null;
let selectedOperator = null;
let startNewNumber = true;
let currentNumber = "0";

function appendCharacter(char) {
    if (char === "." && currentNumber.includes(".") && !startNewNumber) {
        return;
    } else if (char === "." && startNewNumber) {
        currentNumber = "0.";
        startNewNumber = false;
    } else if (startNewNumber || display.value === "Error") {
        currentNumber = char;
        startNewNumber = false;
    } else if (currentNumber === "0") {
        currentNumber = char;
    } else {
        currentNumber += char;
    }

    if (selectedOperator === null) {
        display.value = currentNumber;
    } else {
        display.value = `${firstNumber} ${selectedOperator} ${currentNumber}`;
    }
}

function clearDisplay() {
    display.value = "0";
    firstNumber = null;
    selectedOperator = null;
    currentNumber = "0";
    startNewNumber = true;
}

function deleteLast() {
    if (startNewNumber || display.value === "Error") {
        currentNumber = "0";
        startNewNumber = true;
    } else if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = "0";
    }

    if (selectedOperator === null) {
        display.value = currentNumber;
    } else {
        display.value = `${firstNumber} ${selectedOperator} ${currentNumber}`;
    }
}

function chooseOperator(operator) {
    if (display.value === "Error") {
        clearDisplay();
    } else {
        if (selectedOperator !== null && !startNewNumber) {
            calculator();
        }
        if (firstNumber === null) {
            firstNumber = Number(display.value);
        }
        selectedOperator = operator;
        currentNumber = "";
        startNewNumber = true;
        display.value = `${firstNumber} ${operator}`;
    }
}

function calculator() {
    if (selectedOperator === null || firstNumber === null || startNewNumber) {
        return;
    } else {
        const secondNumber = Number(currentNumber);
        let result;

        if (selectedOperator === "+") {
            result = firstNumber + secondNumber;
        } else if (selectedOperator === "-") {
            result = firstNumber - secondNumber;
        } else if (selectedOperator === "*") {
            result = firstNumber * secondNumber;
        } else if (selectedOperator === "/") {
            if (secondNumber === 0) {
                display.value = "Error";
                firstNumber = null;
                selectedOperator = null;
                currentNumber = "0";
                startNewNumber = true;
                return;
            } else {
                result = firstNumber / secondNumber;
            }
        } else if (selectedOperator === "%") {
            if (secondNumber === 0) {
                display.value = "Error";
                firstNumber = null;
                selectedOperator = null;
                currentNumber = "0";
                startNewNumber = true;
                return;
            } else {
                result = firstNumber % secondNumber;
            }
        } else {
            display.value = "Error";
            firstNumber = null;
            selectedOperator = null;
            currentNumber = "0";
            startNewNumber = true;
            return;
        }

        display.value = String(result);
        firstNumber = null;
        selectedOperator = null;
        currentNumber = String(result);
        startNewNumber = true;
    }
}