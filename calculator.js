const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '/', '*'];
const unaries = ['+', '-'];
let operator = '';
let i = 0;

const display = document.querySelector('#display');
display.textContent = '';

const buttons = Array.from(document.querySelectorAll('button'));
buttons.map(button => button.addEventListener('click', () => {
    if (button.value == 'clear')
        reset();
    else if (button.value == 'operate')
        checkOp(display.textContent, operator);
    else
        display.textContent += `${button.value}`
}));

const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.map(opbtn => opbtn.addEventListener('click', (e) =>
console.log(e.target.value)));


function checkOp(text, operator) {
    const check1 = text.split('');
    checkEnds(check1);
    checkUnary(check1);
    const checkOperator = check1.filter(a => operators.includes(a));        
    if (checkOperator.length == 0)
        console.log('No operator');
    else if (checkOperator.length > 1) {
        console.log('Error or unary');
    }
    else if (checkOperator.length == 1) {
        operator = checkOperator[0];
        console.log(operator);
    }
}


function checkStart(check1) {
    console.log('Check start');
    if (operators.includes(check1[0])) {
        (!unaries.includes(check1[0])) ?
        console.log('Invalid begining') :
        (numbers.includes(check1[1])) ?
        console.log('Unary at begining') :
        console.log('Invalid begining');
    }
    else
        console.log('Continue')
}


function checkEnd(check1) {
    console.log('Check end');
    if (!numbers.includes(check1[check1.length-1]))
        console.log('Cannot end with operator');
    else
        console.log('Continue')
}


function checkUnary (check1) {
    for (i = 0; i < check1.length; i++)
        if (unaries.includes(check1[i]))
            if (numbers.includes(check1[i+1]))
                if (operators.includes(check1[i-1]))
                    if (numbers.includes(check1[i-2]))
                        console.log('We have unary');
}

function operate(text, operator) {
    const operands = text.split(`${operator}`).map(x => Number(x));
    const a = operands[0];
    const b = operands[1];
    switch(operator) {
        case '+': display.textContent = a + b; break;
        case '-': display.textContent = a - b; break;
        case '/': display.textContent = a / b; break;
        case '*': display.textContent = a * b; break;
    }
}

function reset(){
    display.textContent = '';
    i = 0;
    operator = '';
}