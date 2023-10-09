// Code goes here!

interface Admin {
  name: string;
  priveledges: string[]
}

interface Employee {
  name: string;
  startDate: Date;
}

let e1: (Admin & Employee) = {
  name: 'A',
  priveledges: ['B', 'C'],
  startDate: new Date()
}

type Combinable = number | string;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

let a: Universal = 1;

function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b;
}

let result = combine('A', 'B');
let result1 = combine(1, 2);
result.split('');

let user = {
  id: 1,
  name: 'sample',
  job: { 'level': 'AD', 'desig': 'ceo' }
}


let des = user?.job?.desig

// type unknownEmployee = Admin | Employee;

// const printEmployeeDetails = (e1: unknownEmployee) => {
//   console.log(e1.name);
//   if ('priveledges' in e1) {
//     console.log(e1.priveledges);
//   }
//   if ('startDate' in e1) {
//     console.log(e1.startDate)
//   }
// }

// class Car {
//   drive() {
//     console.log('driving...')
//   }
// }

// class Truck {
//   drive() {
//     console.log('driving...')
//   }
//   loadCargo() {
//     console.log('loading cargo...')
//   }
// }

// type Vehicle = Car | Truck;

// const printVehicle = (v1: Vehicle) => {
//   v1.drive();
//   if (v1 instanceof Truck) {
//     v1.loadCargo()
//   }
// }

// let c = new Car();
// let t = new Truck();
// printVehicle(c);
// printVehicle(t);

// interface Bird {
//   kind: 'bird';
//   flyingSpeed: number;
// }

// interface Horse {
//   kind: 'horse'
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// const moveAnimal = (animal: Animal) => {
//   let speed: number;
//   switch (animal.kind) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//       break
//   }
//   console.log('moving at speed ', speed);
// }

// moveAnimal({ kind: 'bird', flyingSpeed: 10 })


// let userInput = document.getElementById('user-input');


// if (userInput) {
//   (userInput as HTMLInputElement).value = 'HI Asif';
// }

// interface ErrorContainer {
//   [prop: string]: string;
// }

// let errorBag: ErrorContainer = {
//   'email': 'Not a valid email',
//   1: 'Not a valid input'
// }
