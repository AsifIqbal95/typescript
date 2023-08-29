function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    console.log(phrase + (n1 + n2))
  }
  else {
    return n1 + n2;
  }
}

let num1 = 2.5;
let num2 = 5;
let toShow = true;
let resultPhrase = 'The Result is ';

let res = add(num1, num2, toShow, resultPhrase);

//console.log(res);