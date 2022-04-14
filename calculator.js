const a = 20;
const b = 4;
operator = '';

function operate(operator) {
    switch(operator){
        case '+':
            return a + b;
        case '-':
            return a - b; 
        case '/':
            return a / b;
        case '*':
            return a * b;
    }
}

console.log(operate('-'));