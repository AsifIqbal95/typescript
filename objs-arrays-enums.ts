
//let ADMIN = 'Admin'
enum ROLE { ADMIN = 9, READ_ONLY = 11, AUTHOR }

let person = {
  name: 'Asif',
  age: 28,
  hobbies: ['TV', 'Playing'],
  role: ROLE.AUTHOR
}

//person.role = [3, 'rrr', 'ooo']
//person.role.push('ooo')

let favActivities: (string | number | { age: number; })[] = ['TV', 1, { age: 10 }]
favActivities.push(1)

//person.fullName = 'Asif Iqbal'

console.log(person.role)
person.role = ROLE.READ_ONLY

/*
in Tuple type we assign the type and number of elements as type.
But push operation is still permitted and an exception.
*/