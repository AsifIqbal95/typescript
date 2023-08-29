function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(n: number): undefined {
  console.log(n);
  return;
}

function printResult1(n: number): void {
  console.log(n);
  return;
}

function addAndHandle(n1: number, n2: number, cb: (res: number) => void) {
  let result = n1 + n2;
  cb(result)
}

addAndHandle(1, 2, (res) => { console.log(res) })

printResult(add(12, 13))

let combineValues: (a: number, b: number) => number;

combineValues = add;
//combineValues = printResult;


console.log(combineValues(8, 8))