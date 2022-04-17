const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '/', '*'];
const unaries = ['+', '-'];
let operator = '';
let startsWithUnary = false;
let error = false;


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


//const operatorButtons = Array.from(document.querySelectorAll('.operator'));
//operatorButtons.map(opbtn => opbtn.addEventListener('click', () =>
//checkOp(display.textContent, operator)));


function checkOp(text, operator) {
    const check1 = text.split('');
    const checkOperator = check1.filter(a => operators.includes(a));
    let opsLength = checkOperator.length;
    
    checkStart(check1);
    console.log(startsWithUnary);
    console.log(error);

    if (opsLength == 0)
        operator = 'none';
    else if (opsLength == 1) {
        (startsWithUnary == true) ?
        operator = 'none':
        operator = checkOperator[0];
    }
    else if (opsLength > 1) {
        (startsWithUnary == true) ?
        operator = checkOperator[1]:
        operator = checkOperator[0];
    }
    console.log(operator);
    if (operator != 'none' && error == false)
        operate(text, operator);
    // if operation button invokes the function check1.pop();
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


function checkEnd(check1) {
    console.log('Check end');
    if (!numbers.includes(check1[check1.length-1]))
        console.log('Cannot end with operator');
    else
        console.log('Continue')
}


function operate(text, operator) {
    const operands = text.split(`${operator}`).map(x => Number(x));
    const a = operands[0];
    const b = operands[1];
    if (isNaN(b))
        error = true;
    else {
        switch(operator) {
            case '+': display.textContent = a + b; break;
            case '-': display.textContent = a - b; break;
            case '/': display.textContent = a / b; break;
            case '*': display.textContent = a * b; break;
        }
    }
    console.log(`Error in operation : ${error}`);
}

function reset(){
    display.textContent = '';
    i = 0;
    operator = '';
}