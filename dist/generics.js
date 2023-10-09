"use strict";
let arr = ['A'];
arr[0].split('');
let prom = new Promise((resolve) => {
    setTimeout(() => {
        resolve('I am a string');
    }, 2000);
});
prom.then(data => {
    data.toUpperCase();
});
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
let res = merge({ name: 'Asif' }, { age: 28 });
console.log(res.name);
function countandDescribe(element) {
    let description = 'Got no value.';
    if (element.length === 1) {
        description = 'Got 1 value';
    }
    else if (element.length > 1) {
        description = `Got ${element.length} value`;
    }
    return [element, description];
}
console.log(countandDescribe('I am 6'));
console.log(countandDescribe([1, 2, 3, 4]));
function extractAndConvert(obj, key) {
    return `Value is ${obj[key]}`;
}
extractAndConvert({ name: 'asif', age: 28 }, 'age');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        return this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return this.data;
    }
}
let stringStorage = new DataStorage();
stringStorage.addItem('A');
stringStorage.addItem('B');
stringStorage.addItem('C');
stringStorage.removeItem('A');
console.log(stringStorage.getItems());
function createCourseGoal(title, description, completeUntil) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}
const names = ['A', 'B'];
//# sourceMappingURL=generics.js.map