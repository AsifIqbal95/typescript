type Combinable = number | string;
type ConversionDescriptor = ('as-text' | 'as-number');


function combine(n1: Combinable, n2: Combinable, resultConversion: ConversionDescriptor) {
  let result;
  if ((typeof n1 === 'number' && typeof n2 === 'number') || resultConversion === 'as-number') {
    result = +n1 + +n2;
  }
  else {
    result = n1.toString() + n2.toString()
  }
  return result;
}

let combineAges = combine(20, 35, 'as-number');
console.log(combineAges);

let combineNames = combine('Asif', 'Iqbal', 'as-text');
console.log(combineNames);

const num = 2;
const numArr = [2]