const display = document.querySelector('#display');
display.textContent = '';

const operators = ['+', '-', '/', '*'];
let operator = '';
let i = 0;


const buttons = Array.from(document.querySelectorAll('button'));
buttons.map(button => button.addEventListener('click', () => {
    if (button.value == 'clear')
        reset();
    else if (button.value == 'operate')
        checkOp(display.textContent, operator);
    else
        display.textContent += `${button.value}`
}));

function checkOp(text, operator) {
    const check1 = text.split('');
    console.log(check1);

    const checkOperator = check1.filter(a => operators.includes(a));
    console.log(checkOperator);

    if (checkOperator.length == 0)
        console.log('No operator');
    else if (checkOperator.length > 1)
        console.log('Error - too many operators or just "+num" or "-num".....');
    else if (checkOperator.length == 1){
        console.log('Check position!');
        operator = checkOperator[0];
        if (operator == check1[0] || operator == check1[check1.length-1])
            console.log('Error - wrong position');
        else    
            console.log('Continue');
    }
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