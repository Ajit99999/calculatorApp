const btnElements = document.querySelectorAll('button');
const displayelem = document.querySelector('h1');
const clearBtnElem = document.querySelector('#clear-btn')

let firstValue = 0;
let operator = "";
let awaitingNextValue = false;

function inputNumberValues(e) {


    if (awaitingNextValue) {
        displayelem.textContent = e.target.value;
        awaitingNextValue = false;
    }
    else {
        let displayVal = displayelem.textContent;

        if (displayVal === '0') {

            displayelem.textContent = e.target.value;
        }
        else {
            displayelem.textContent = displayelem.textContent + e.target.value;
        }
    }



}



function addDecimal(e) {

    if (awaitingNextValue) {
        return
    }
    if (displayelem.textContent.includes('.')) {
        displayelem.textContent = displayelem.textContent;
    }
    else {
        displayelem.textContent = displayelem.textContent + e.target.value
    }
}

const calculationObj = {
    '/': (firstVal, secondVal) => firstVal / secondVal,
    '*': (firstVal, secondVal) => firstVal * secondVal,
    '+': (firstVal, secondVal) => firstVal + secondVal,
    '-': (firstVal, secondVal) => firstVal - secondVal,
    '=': (firstVal, secondVal) => secondVal,

}

function operatorValues(e) {
   
    if (operator && awaitingNextValue) {
        operator = e.target.value;
        return;
    }
    console.log(e.target.value)
    let currentValue = Number(displayelem.textContent);
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {

        const res = calculationObj[operator](firstValue, currentValue);

        firstValue = res;
        displayelem.textContent = res
    }
    awaitingNextValue = true;
    operator = e.target.value;


}

btnElements.forEach((ele) => {

    if (ele.classList.contains('number')) {
        ele.addEventListener('click', inputNumberValues.bind(this))
    }
    else if (ele.classList.contains('operator')) {
        ele.addEventListener('click', operatorValues.bind(this));

    }
    else if (ele.classList.contains('decimal')) {
        ele.addEventListener('click', addDecimal.bind(this));
    }


})

clearBtnElem.addEventListener('click', function () {
    displayelem.textContent = 0;
    firstValue = 0;
    awaitingNextValue = false;
    operator = "";
})