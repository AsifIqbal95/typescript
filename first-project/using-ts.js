var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
/*
Lessons learned

1. ! for implying that the element will be not null
2. as HTMLXXX to typecast to a particular element so that value property will be available.
3. added typed to the function parameter
4. + for typecasting the value to number

*/
