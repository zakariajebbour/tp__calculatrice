let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;

function initialiser_calc(calcId) {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetInput = false;
    updateDisplay();
}

function add_calc(calcId, value) {
    if (currentInput === '0' || resetInput) {
        currentInput = value.toString();
        resetInput = false;
    } else {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value.toString();
    }
    updateDisplay();
}

function f_calc(calcId, op) {
    switch (op) {
        case 'ce':
            initialiser_calc(calcId);
            break;
        case 'nbs':
            if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            break;
        case '%':
            currentInput = (parseFloat(currentInput) / 100).toString();
            break;
        case '+-':
            currentInput = (parseFloat(currentInput) * -1).toString();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(op);
            break;
        case '=':
            calculate();
            break;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetInput = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
    resetInput = true;
}

function updateDisplay() {
    document.getElementById('calc_resultat').value = currentInput;
}

function key_detect_calc(calcId, event) {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        add_calc(calcId, parseInt(key));
    } else if (key === '.') {
        add_calc(calcId, key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        f_calc(calcId, key);
    } else if (key === '%') {
        f_calc(calcId, '%');
    } else if (key === 'Enter' || key === '=') {
        f_calc(calcId, '=');
    } else if (key === 'Backspace') {
        f_calc(calcId, 'nbs');
    } else if (key === 'Escape') {
        f_calc(calcId, 'ce');
    }
    
    if (['+', '-', '*', '/', '%', 'Enter', '=', 'Backspace', 'Escape'].includes(key)) {
        event.preventDefault();
    }
}

window.onload = function() {
    initialiser_calc('calc');
};