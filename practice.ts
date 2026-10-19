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

/** ---- Literal Types ---- */

let userName = 'Peter'; // TypeScript infers the type of username is a string.
const userName2 = 'Santiago'; // TypeScript infers the type of username2 is the literal type 'Santiago' because it is a constant and cannot be changed. This is called a literal type. It is a type that can only have one value.

/** ---- Union Types ---- */

type User = {
  id: number;
  username: string;
  role: 'guest' | 'member' | 'admin'; // This is a union type that can be either 'guest' | 'admin' | 'user'
};

let nextUserId = 1;

let userRole: User['role'] = 'member';

/** ---- Function return types ---- */

const users: User[] = [
  { id: nextUserId++, username: 'daniel_prof', role: 'member' },
  { id: nextUserId++, username: 'jesus_christ', role: 'admin' },
  { id: nextUserId++, username: 'pil_king', role: 'guest' },
  { id: nextUserId++, username: 'simon_disciple', role: 'guest' },
];

function fetchUserDetails(username: string): User {
  const user = users.find((user) => user.username === username);

  if (!user) throw new Error(`User with username ${username} not found`);
  return user;
}

/** ---- Utility Types: Partial | Omit ---- */

// Find the user in the array by the id
// Use Object.assign to update the found user in place.
// Check MDN if you need help with using Object.assign

function updateUser(id: number, updates: Partial<User>) {
  const user = users.find((user) => user.id === id);

  if (!user) throw new Error(`User with id ${id} not found`);

  Object.assign(user, updates);
  return user;
}

console.log('Before update', users);

updateUser(1, { username: 'john_disciple' });
updateUser(4, { role: 'member' });

console.log('After update', users);

function addNewUser(newUser: Omit<User, 'id'>): User {
  const user: User = { id: nextUserId++, ...newUser };
  users.push(user);
  return user;
}

addNewUser({ username: 'mary_magdalene', role: 'member' });

console.log('After adding new user', users);
