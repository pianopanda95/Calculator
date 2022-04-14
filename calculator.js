const buttons = Array.from(document.querySelectorAll('button'));
buttons.map(button => button.addEventListener('click', () =>
    console.log(button.value)));

    
function test(){
}
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
