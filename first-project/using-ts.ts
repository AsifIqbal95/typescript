const button = document.querySelector("button")! as HTMLButtonElement;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
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


