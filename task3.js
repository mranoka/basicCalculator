let c = 0;
// increments c by 1 each time button is clicked
let counter = () => {
    c++;
    document.getElementById('count').innerText = c;
}

// Does currency conversion from rand to dollar, euro and pound sterling
let converter = () => {
    let rand = parseInt(document.getElementById('rand-entry').value);
    let dollar = rand / 17.34;
    let euro = rand / 20.72;
    let pound = rand / 22.90;
    document.getElementById('dollar').innerHTML = dollar.toFixed(2) + ' dollars'
    document.getElementById('euro').innerHTML = euro.toFixed(2) + ' euros'
    document.getElementById('pound').innerHTML = pound.toFixed(2) + ' pounds'
}

// creates a drop-down menu with 25 numbered options
let options = () => {
    let menu = document.getElementById('ddmenu');
    for (let i = 1; i <= 25; i++) {
        let optn = document.createElement('option');
        optn.innerHTML = "option element " + i;
        menu.appendChild(optn);
    }
}

// ----------------------------logic for calculator----------------------------------

class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear();
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        //if (number.toString() === '.' && this.currOperand.toString().inlcudes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }
    // performs desired computation when equals sign is clicked
    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            default:
                return

        }

        this.currOperand = computation;
        this.operation = undefined
        this.prevOperand = ''
    }
    // displays numbers and implements comma separation for thousandth digit
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }
    // updates calculator display with current and previous numbers and operations
    updateDisplay() {
        this.currOperandTextElement.innerText = this.getDisplayNumber(this.currOperand)
        if (this.operation != null) {
            this.prevOperandTextElement.innerText =
                `${this.prevOperand} ${this.operation}`
        } else {
            this.prevOperandTextElement.innerText = ''
        }

    }
}


// calculator button element variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currOperandTextElement = document.querySelector('[data-curr-operand ]');

// create instance of Calculator class
const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

// extract inner text from clicked number button element and display result
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});
// extract inner text from clicked operation button element and display result
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
// perform required computations when equals button is clicked
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
// clear display if allclear button is clicked
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
// delete last item on calculator display when delete button is clicked
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})