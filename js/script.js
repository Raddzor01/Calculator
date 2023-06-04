import { buttonTypes, factorial } from "./consts.js";

const modeButton = document.getElementById("mode");
const engiButtons = document.querySelectorAll(".engi");
const memoButtons = document.querySelectorAll(".memory");
const stdButtons = document.querySelectorAll(".std");
const convertButtons = document.querySelectorAll(".convert");
const dropdownItems = document.querySelectorAll(".dropdown-content a");
const display = document.querySelector('#display');
const secondDisplay = document.querySelector('#second-display');
const equal = document.getElementById("equal");

class Calculator {
    str;
    history;
    memory;
    mode;
    constructor() {
        this.mode = 'dec';
        this.history = "";
        this.str = '0';
        this.mem = '0';
        this.updateOutput();
    }

    updateOutput() {
        display.value = this.str !== "" ? this.str : "0";
    }

    calculate(isPercent = false) {
        if (historyPanel.classList.contains("visible")) {
            historyPanel.classList.toggle("visible");
          }

        if(!isNaN(Number(this.str)))
            return;

        if (isPercent)
            this.str = this.str + '/100';

        this.history += this.str;

        try {
            this.str = Math.round((Function(`return ${String(this.str).replace("^", "**")}`)() + Number.EPSILON) * 10000) / 10000;
        }
        catch {
            display.value = 'Error';
            setTimeout(() => {display.value = this.str}, 3000);
        }

        if (this.str == 'NaN')
            this.str = 'Error';

        this.history += ' = ' + this.str + ';';
    }

    buttonPress(value) {
        this.str = String(this.str);
        if (this.str == 'Infinity' || this.str == '-Infinity')
            this.str = '0';
        if (isNaN(Number(value)) && isNaN(Number(this.str[this.str.length - 1])))
            this.str = this.str.slice(0, -1);
        switch (value) {
            case buttonTypes.DOT:
                let numbers = String(this.str).split(' ');
                let number = numbers[numbers.length - 1];
                if (number.includes('.') || number == '')
                    return;
                this.str += value;
                break;
            case buttonTypes.EQUAL:
                this.calculate()
                break;
            case buttonTypes.PERCENTAGE:
                this.calculate(true)
                break;
            case buttonTypes.EXP:
                this.str += Math.exp;
                break;
            case buttonTypes.PI:
                this.str += "*" + 3.1415;
                break;
            case buttonTypes.CLEAN:
                this.str = "0";
                break;
            case buttonTypes.MEMORYCLEAR:
                this.memory = '0';
                break;
            case buttonTypes.MEMORYPLUS:
                if (this.str !== '')
                    this.calculate();
                this.str += +this.mem;
                break;
            case buttonTypes.MEMORYMINUS:
                if (this.str !== '')
                    this.calculate();
                this.str -= +this.mem;
                this.str = this.str.toString();
                break;
            case buttonTypes.MEMORYRESET:
                this.mem = this.str;
                break;
            case buttonTypes.SQRT:
                this.history += '√' + this.str;
                this.str = String(Math.round((Math.sqrt(this.str) + Number.EPSILON) * 10000) / 10000);
                this.history += ' = ' + this.str + ';';
                break;
            case buttonTypes.FACTORIAL:
                if (this.str < 0) {
                    display.value = 'Error';
                    setTimeout(() => { display.value = this.str }, 2000);
                    return;
                }
                this.calculate();
                this.history += '!' + this.str;
                this.str = factorial(this.str);
                this.history += '=' + this.str + ';';
                break;
            case buttonTypes.LOGNATURAL:
                this.history += 'ln(' + this.str + ')';
                this.str = Math.round((Math.log(this.str) + Number.EPSILON) * 10000) / 10000;
                this.history += '=' + this.str + ';';

                break;
            case buttonTypes.DEGREE:
                this.str += '^';
                break;
            case buttonTypes.SIGNCHANGE:
                let operands = String(this.str).split(" ");
                let lastOperand = operands[operands.length - 1]

                if (lastOperand !== "0") {
                    if (lastOperand[0] == "-")
                        lastOperand = lastOperand.substring(1);
                    else
                        lastOperand = "-" + lastOperand

                    this.str = operands.slice(0, -1).join(" ") + " " + lastOperand;
                }
                break;
            default:
                if (!isNaN(Number(value)) && this.str == '0')
                    this.str = this.str.slice(1);
                this.str += value;
                break;
        }
        this.updateOutput();
    }
}

class Converter extends Calculator {
    firstNumber;
    firstCalcType;
    secondNumber;
    secondCalcType;
    constructor() {
        super();
        this.firstNumber = '0';
        this.firstCalcType = 'm';
        this.secondNumber = '0';
        this.secondCalcType = 'cm';
        this.updateOutput();
    }

    updateOutput() {
        secondDisplay.value = this.secondNumber + this.secondCalcType;
        display.value = this.firstNumber + this.firstCalcType;
    }

    calculate() {
        let temp = +this.firstNumber;
        if (this.firstCalcType == buttonTypes.CMETER
            || this.firstCalcType == buttonTypes.METER
            || this.firstCalcType == buttonTypes.KMETER) {

            if (this.firstCalcType == buttonTypes.CMETER)
                temp *= 0.01;
            else if (this.firstCalcType == buttonTypes.METER)
                temp *= 1;
            else if (this.firstCalcType == buttonTypes.KMETER)
                temp *= 1000;

            if (this.secondCalcType == buttonTypes.CMETER)
                temp *= 100;
            else if (this.secondCalcType == buttonTypes.METER)
                temp *= 1;
            else if (this.secondCalcType == buttonTypes.KMETER)
                temp *= 0.001;
            else
                temp = 'Error';
        } else if (this.firstCalcType == buttonTypes.GRAM
            || this.firstCalcType == buttonTypes.KGRAM
            || this.firstCalcType == buttonTypes.TON) {

            if (this.firstCalcType == buttonTypes.GRAM)
                temp *= 1;
            else if (this.firstCalcType == buttonTypes.KGRAM)
                temp *= 1000;
            else if (this.firstCalcType == buttonTypes.TON)
                temp *= 1000000;

            if (this.secondCalcType == buttonTypes.GRAM)
                temp *= 1;
            else if (this.secondCalcType == buttonTypes.KGRAM)
                temp *= 0.001;
            else if (this.secondCalcType == buttonTypes.TON)
                temp *= 0.000001;
            else
                temp = 'Error';
        } else if (this.firstCalcType == buttonTypes.S_CMETER
            || this.firstCalcType == buttonTypes.S_KMETER
            || this.firstCalcType == buttonTypes.S_METER) {
                if (this.firstCalcType == buttonTypes.S_CMETER)
                temp *= 0.01;
            else if (this.firstCalcType == buttonTypes.S_METER)
                temp *= 1;
            else if (this.firstCalcType == buttonTypes.S_KMETER)
                temp *= 1000000;

            if (this.secondCalcType == buttonTypes.S_CMETER)
                temp *= 100;
            else if (this.secondCalcType == buttonTypes.S_METER)
                temp *= 1;
            else if (this.secondCalcType == buttonTypes.S_KMETER)
                temp *= 0.000001;
            else
                temp = 'Error';
        }
        if (temp == 'Error') {
            secondDisplay.value = 'Error';
            setTimeout(()=> {converter.updateOutput()}, 3000);
        } else {
            this.secondNumber = temp;
            calc.history += this.firstNumber + this.firstCalcType + `→` + this.secondNumber + this.secondCalcType + ';';
            this.updateOutput();
        }
    }

    buttonPress(value) {
        if (!isNaN(Number(value))) {
            if (this.firstNumber == '0')
                this.firstNumber = this.firstNumber.slice(1);
            this.firstNumber += value;
            this.updateOutput();
        } else if (value === '.') {
            this.firstNumber += value;
            this.updateOutput();
        } else if (value == buttonTypes.CLEAN) {
            this.firstNumber = '0';
            this.secondNumber = '0';
            this.updateOutput();
        } else if (value == '=') {
            this.calculate();
        }
    }

    calcTypePress(value, isRight = true) {
        if (isRight)
            this.secondCalcType = value;
        else
            this.firstCalcType = value;
        this.updateOutput();
    }
}

var calc = new Calculator();
var converter;

document.querySelectorAll('.std, .engi, .memory').forEach((button) => {
    button.addEventListener("click", () => {
        calc.buttonPress(button.textContent)
    });
});

document.querySelectorAll('.left').forEach((button) => {
    button.addEventListener("click", () => {
        converter.calcTypePress(button.textContent, false);
    })
});

document.querySelectorAll('.right').forEach((button) => {
    button.addEventListener("click", () => {
        converter.calcTypePress(button.textContent);
    })
});

document.querySelectorAll('.panel').forEach((button) => {
    button.addEventListener("click", () => {
        converter.buttonPress(button.textContent);
    })
});

function handleModeSelection(event) {
    event.preventDefault();
    const selectedMode = event.target.dataset.mode;

    updateModeLabel(selectedMode);
    toggleButtonVisibility(selectedMode);
}

dropdownItems.forEach(item => {
    item.addEventListener("click", handleModeSelection);
});

function updateModeLabel(mode) {
    modeButton.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
}

function toggleButtonVisibility(mode) {
    if (mode === "standard") {
        calc.updateOutput();
        engiButtons.forEach(button => {
            button.classList.remove("visible");
        });
        memoButtons.forEach(button => {
            button.classList.remove("visible");
        });
        stdButtons.forEach(button => {
            button.classList.add("visible");
        });
        convertButtons.forEach(button => {
            button.classList.remove("visible");
        });
        // equal.style.width = "152px";
    } else if (mode === "engineer") {
        calc.updateOutput();
        engiButtons.forEach(button => {
            button.classList.add("visible");
        });
        memoButtons.forEach(button => {
            button.classList.add("visible");
        });
        stdButtons.forEach(button => {
            button.classList.add("visible");
        });
        convertButtons.forEach(button => {
            button.classList.remove("visible");
        });
        // equal.style.width = "152px";
    } else if (mode === "convert") {
        converter = new Converter();
        engiButtons.forEach(button => {
            button.classList.remove("visible");
        });
        memoButtons.forEach(button => {
            button.classList.remove("visible");
        });
        stdButtons.forEach(button => {
            button.classList.remove("visible");
        });
        convertButtons.forEach(button => {
            button.classList.add("visible");
        });
        // equal.style.width="75px";
    }

    stdButtons.forEach(button => {
        if (mode === "convert") {
            button.style.display = "none";
        } else {
            button.style.display = "block";
        }
    });
}

const historyButton = document.getElementById("history");
const historyPanel = document.querySelector(".history");
const historyBuffer = [];

historyButton.addEventListener("click", () => {
  historyPanel.classList.toggle("visible");
  if (historyPanel.classList.contains("visible")) {
    updateHistoryPanel();
  }
});

historyPanel.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const text = clickedElement.textContent;
  navigator.clipboard.writeText(text);
  clickedElement.textContent = 'Text copied to clipboard!';
  setTimeout(() => {clickedElement.textContent = text}, 3000);

  historyBuffer.push(text);
});

function updateHistoryPanel() {
  historyPanel.innerHTML = "";
  const historyArray = calc.history.split(';');
  const nonEmptyHistory = historyArray.filter((item) => item.trim() !== "");
  for (const item of nonEmptyHistory) {
    const button = document.createElement("button");
    button.textContent = item;
    button.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const text = clickedElement.textContent;
      historyBuffer.push(text);
    });

    historyPanel.appendChild(button);
  }
}

updateHistoryPanel();

