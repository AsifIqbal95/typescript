"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    return function (arg1) {
        console.log(logString);
        console.log(arg1);
    };
}
function WithTemplate(_, selector) {
    return function (Originalconstructor) {
        return class extends Originalconstructor {
            constructor(..._) {
                super();
                let l = document.getElementById(selector);
                l.innerText = this.name;
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Asif';
        console.log('Creating Person Object');
    }
};
Person = __decorate([
    Logger('Logging Person class'),
    WithTemplate('', 'app')
], Person);
let person1 = new Person();
function Log(arg1, arg2) {
    console.log('Property Decorator');
    console.log('arg1', arg1);
    console.log('arg2', arg2);
}
function Log1(arg1, arg2, arg3) {
    console.log('Method Decorator');
    console.log('arg1', arg1);
    console.log('arg2', arg2);
    console.log('arg3', arg3);
}
function Log2(arg1, arg2, arg3) {
    console.log('Parameter Decorator');
    console.log('arg1', arg1);
    console.log('arg2', arg2);
    console.log('arg2', arg3);
}
function Log3(arg1, arg2, arg3) {
    console.log('setter Decorator');
    console.log('arg1', arg1);
    console.log('arg2', arg2);
    console.log('arg3', arg3);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - Should be positive!');
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log3
], Product.prototype, "price", null);
__decorate([
    Log1,
    __param(0, Log2)
], Product.prototype, "getPriceWithTax", null);
let p = new Product('t1', 10);
function autoBinder(_target, _, descriptor) {
    let oldFn = descriptor.value;
    descriptor.get = function () {
        return oldFn.bind(this);
    };
    delete descriptor.value;
    delete descriptor.writable;
    return descriptor;
}
class Printer {
    constructor() {
        this.message = 'this works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    autoBinder
], Printer.prototype, "showMessage", null);
let pr = new Printer();
let btn = document.getElementById('my-btn');
btn.addEventListener('click', pr.showMessage);
const registeredValidators = {};
function Required(ctorFn, propName) {
    registeredValidators[ctorFn.constructor.name] = Object.assign(Object.assign({}, registeredValidators[ctorFn.constructor.name]), { [propName]: ['required'] });
}
function Positive(ctorFn, propName) {
    registeredValidators[ctorFn.constructor.name] = Object.assign(Object.assign({}, registeredValidators[ctorFn.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, n) {
        this.title = t;
        this.price = n;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map