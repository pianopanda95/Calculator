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
        opCheck(display.textContent, operator);
    else
        display.textContent += `${button.value}`
}));

function opCheck(text, operator){
    i = 0;
    while (i < operators.length && operator == '') {
        if (text.split('').includes(operators[i]))
            operator = operators[i--];
        i++;
    }
    console.log(i);
    if (i < 4) {
        console.log(operator);
        operate(text, operator);
    } else {
        console.log('Sg went wrong');
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