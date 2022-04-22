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

    if (button.value == 'clear') {
        setDefaultvalues();
        display.textContent = '';
    }
    else if (button.value == 'operate')
        findOperator(display.textContent, operator);
    else 
        display.textContent += `${button.value}`
    
    if (operators.includes(button.value))
        opButton(display.textContent);
}));


function findOperator(text, operator) {
    const check1 = text.split('');
    const checkOperator = check1.filter(a => operators.includes(a));
    let opsLength = checkOperator.length;
    
    checkStart(check1);
    if (error)
        return errorTrue();

    if (opsLength == 1 && !startsWithUnary)
        operator = checkOperator[0];
    else if (opsLength > 1) {
        (startsWithUnary) ?
        operator = checkOperator[1]:
        operator = checkOperator[0];
    }
    console.log(operator);

    if (!operator)
        return;
    else
        checkOperation(text, operator, startsWithUnary);
}


function checkStart(check1) {
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

function opButton(text) {
    if (text.length < 4)
        return;
    
    let check4 = text.split('');
    nextOperator = check4.pop();
    
    if (!numbers.includes(check4[check4.length-1])) // ?
        return;
    
    check4 = check4.join('');
    findOperator(check4, operator);
}

function checkOperation(text, operator, startsWithUnary){
    const separatorIndex = text.indexOf(`${operator}`, startsWithUnary);
    const check2 = Array.from(text);
    check2[separatorIndex] = '|';
    if (separatorIndex == check2.length -1)
        return;
    const check3 = check2.join('').split('|');

    const operands = check3.map(x => Number(x));
    const a = operands[0];
    const b = operands[1];
    
    console.log(operands);

    if (isNaN(b))
        return errorTrue();
    else if (operator == '/' && b == 0)
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
    if (nextOperator)
       display.textContent += nextOperator;
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