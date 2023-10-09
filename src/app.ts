function Logger(logString: string) {
  return function (arg1: Function) {
    console.log(logString);
    console.log(arg1)
  }

}

// function WithTemplate(_: string, selector: string) {
//   return function <T extends { new(...args: any[]): { name: string } }>(Originalconstructor: T) {

//     return class extends Originalconstructor {
//       constructor(..._: any[]) {
//         super()
//         let el = document.getElementById(selector)!;
//         el.innerText = this.name;
//       }
//     }
//   }
// }

function WithTemplate(_: string, selector: string) {
  return function <T extends { new(...args: any[]): { name: string } }>(Originalconstructor: T) {
    return class extends Originalconstructor {
      constructor(..._: any[]) {
        super();
        let l = document.getElementById(selector)!;
        l.innerText = this.name;
      }
    }
  }
}

@Logger('Logging Person class')
@WithTemplate('', 'app')
class Person {
  name: string = 'Asif';

  /**
   *
   */
  constructor() {
    console.log('Creating Person Object')
  }
}

let person1 = new Person();
// console.log(person1)

function Log(arg1: any, arg2: any) {
  console.log('Property Decorator')
  console.log('arg1', arg1);
  console.log('arg2', arg2);
}

function Log1(arg1: any, arg2: any, arg3: any) {
  console.log('Method Decorator')
  console.log('arg1', arg1);
  console.log('arg2', arg2);
  console.log('arg3', arg3)
}

function Log2(arg1: any, arg2: any, arg3: any) {
  console.log('Parameter Decorator')
  console.log('arg1', arg1);
  console.log('arg2', arg2);
  console.log('arg2', arg3);
}

function Log3(arg1: any, arg2: any, arg3: any) {
  console.log('setter Decorator')
  console.log('arg1', arg1);
  console.log('arg2', arg2);
  console.log('arg3', arg3)
}


class Product {
  @Log
  title: string;
  private _price: number;

  @Log3
  set price(val: number) {
    if (val > 0) {
      this._price = val
    }
    else {
      throw new Error('Invalid price - Should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log1
  getPriceWithTax(@Log2 tax: number) {
    return this._price * (1 + tax);
  }

}

let p = new Product('t1', 10)


function autoBinder(_target: any, _: string, descriptor: PropertyDescriptor) {

  // let originalDescriptor = descriptor.value;
  // let adjDescriptor: PropertyDescriptor = {
  //   configurable: true,
  //   enumerable: false,
  //   get() {
  //     const boundFn = originalDescriptor.bind(this)
  //     return boundFn;
  //   }
  // }
  // let newDesc = {
  //   ,
  //   get() {
  //     return descriptor.value.bind(this);
  //   }
  // }
  let oldFn = descriptor.value;

  descriptor.get = function () {
    return oldFn.bind(this);
  };
  delete descriptor.value
  delete descriptor.writable
  return descriptor;
}


class Printer {
  message = 'this works!';

  @autoBinder
  showMessage() {
    console.log(this.message);
  }
}

let pr = new Printer();



let btn = document.getElementById('my-btn')!;
btn.addEventListener('click', pr.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatable: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(ctorFn: any, propName: string) {
  registeredValidators[ctorFn.constructor.name] = { ...registeredValidators[ctorFn.constructor.name], [propName]: ['required'] }
}

function Positive(ctorFn: any, propName: string) {
  registeredValidators[ctorFn.constructor.name] = { ...registeredValidators[ctorFn.constructor.name], [propName]: ['positive'] }
}

function validate(obj: any) {
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
  @Required
  title: string;

  price: number;

  constructor(t: string, n: number) {
    this.title = t;
    this.price = n;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again');
    return;
  }
  console.log(createdCourse)

})