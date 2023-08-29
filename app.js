function add(n1, n2) {
    return n1 + n2;
}
function printResult(n) {
    console.log(n);
    return;
}
function printResult1(n) {
    console.log(n);
    return;
}
printResult(add(12, 13));
var combineValues;
combineValues = add;
//combineValues = printResult;
console.log(combineValues(8, 8));
