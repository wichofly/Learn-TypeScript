/**---- Custom Types ----*/

// type Person = {
//   name: string;
//   age: number;
//   isStudent: boolean;
// };

// let person: Person = {
//   name: 'John',
//   age: 24,
//   isStudent: true,
// };

// let person2: Person = {
//   name: 'Mary',
//   age: 43,
//   isStudent: false,
// };

/**----  Nested object Types ----*/

type Address = {
  street: string;
  city: string;
  country: string;
};

type Person = {
  name: string;
  age: number;
  isStudent: boolean;
  address?: Address;
};

let person: Person = {
  name: 'John',
  age: 24,
  isStudent: true,
  address: {
    street: 'fish street',
    city: 'Bethsaida',
    country: 'Israel',
  },
};

let person2: Person = {
  name: 'Mary',
  age: 43,
  isStudent: false,
};

function displayPersonInfo(person: Person) {
  console.log(
    `${person.name} is ${person.age} years old and lives in ${person.address?.city}`,
  );
}

displayPersonInfo(person);
displayPersonInfo(person2);

/** ---- Typing Arrays ---- */

// Using arrays it is necessary to use the square brackets to indicate that it is an array of a certain type.

const ages: number[] = [23, 43, 13, 41];

/**
 * Challenge: create an array of people objects and
 * manually type it as an array of Person types
 */

// Array<Person> is another way to type an array of Person objects. It is equivalent to Person[].
const people: Person[] = [person, person2];

