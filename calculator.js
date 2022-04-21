const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '/', '*'];
const unaries = ['+', '-'];

let operator = '';
let nextOperator = '';
let startsWithUnary = false;
let error = false;


const display = document.querySelector('#display');
display.textContent = '';

const buttons = Array.from(document.querySelectorAll('button'));
buttons.map(button => button.addEventListener('click', () => {
    if (button.value == 'clear')
        reset();
    else if (button.value == 'operate')
        findOperator(display.textContent, operator);
    else 
        display.textContent += `${button.value}`
}));


//const operatorButtons = Array.from(document.querySelectorAll('.operator'));
//operatorButtons.map(opbtn => opbtn.addEventListener('click', () =>
//checkOp(display.textContent, operator)));


function findOperator(text, operator) {
    const check1 = text.split('');
    const checkOperator = check1.filter(a => operators.includes(a));
    let opsLength = checkOperator.length;
    
    checkStart(check1);
    if (error)
        return errorTrue();

    if (opsLength == 0)
        operator = 'none';
    else if (opsLength == 1) {
        (startsWithUnary) ?
        operator = 'none':
        operator = checkOperator[0];
    }
    else if (opsLength > 1) {
        (startsWithUnary) ?
        operator = checkOperator[1]:
        operator = checkOperator[0];
    }
    console.log(operator);
    if (operator == 'none')
        console.log('Displaytext stays')
    else
        checkOperation(text, operator, startsWithUnary);
}


function checkStart(check1) {
    console.log('Check start');
    if (operators.includes(check1[0])) {
        (!unaries.includes(check1[0])) ?
        error = true :
        (numbers.includes(check1[1])) ?
        startsWithUnary = true :
        error = true;
    }
    else
        error = false;
}

function checkOperation(text, operator, startsWithUnary){
    const separatorIndex = text.indexOf(`${operator}`, startsWithUnary);
    const check2 = Array.from(text);
    check2[separatorIndex] = '|';
    const check3 = check2.join('').split('|');

    const operands = check3.map(x => Number(x));
    const a = operands[0];
    const b = operands[1];
    
    console.log(operands);

    if (isNaN(b))
        return errorTrue();
    else
        operate(a, b, operator);
}

function operate(a, b, operator) {
    switch(operator) {
        case '+': display.textContent = a + b; break;
        case '-': display.textContent = a - b; break;
        case '/': display.textContent = a / b; break;
        case '*': display.textContent = a * b; break;
    }
    setDefaultvalues();
}

function errorTrue() {
    alert('ERROR! Something went wrong.');
    setDefaultvalues();
    display.textContent = '';
}

function setDefaultvalues() {
    startsWithUnary = false;
    error = false;
    operator = '';
    nextOperator = '';
}