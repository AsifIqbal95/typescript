let arr: Array<string> = ['A']

arr[0].split('');

let prom: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('I am a string')
  }, 2000)
})

prom.then(data => {
  data.toUpperCase();
})

function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

let res = merge({ name: 'Asif' }, { age: 28 });
console.log(res.name)


interface Lengthy {
  length: number;
}

function countandDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value.';
  if (element.length === 1) {
    description = 'Got 1 value';
  }
  else if (element.length > 1) {
    description = `Got ${element.length} value`;
  }
  return [element, description]
}

console.log(countandDescribe('I am 6'));
console.log(countandDescribe([1, 2, 3, 4]))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value is ${obj[key]}`
}

extractAndConvert({ name: 'asif', age: 28 }, 'age')

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    return this.data.splice(this.data.indexOf(item), 1)
  }
  getItems() {
    return this.data;
  }
}

let stringStorage = new DataStorage<string>();

stringStorage.addItem('A');
stringStorage.addItem('B');
stringStorage.addItem('C');

stringStorage.removeItem('A');
console.log(stringStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, completeUntil: Date) {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  return courseGoal;
}

const names: Readonly<string[]> = ['A', 'B']