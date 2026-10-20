# Learn TypeScript

Practice notes from the Scrimba TypeScript course. These examples use people, users, pizzas, and orders to explore how TypeScript describes data and checks how we use it.

## Run the examples

The examples have been verified with Node.js **22.18.0**, which can run the TypeScript syntax used here directly. No dependency installation is needed.

Open a terminal in this project folder and run either command:

```powershell
npm run practice
```

```powershell
npm run index
```

Each command prints the file's `console.log()` output, stays active, and reruns the file when you save changes. Previous output remains visible. Press **Ctrl+C** to stop; the terminal stays open. To run both files together, use separate terminal tabs.

To run a file just once:

```powershell
node practice.ts
node index.ts
```

Each run starts the program again, resetting its variables. Data is stored in memory for that run.

Node runs these examples by removing their TypeScript types; it does **not** check those types. Running successfully and passing TypeScript type checking are separate things.

## Project files

| File                                           | Purpose                                                                                                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [practice.ts](practice.ts)                     | Examples of object types, arrays, return values, utility types, and generics.                                                                                     |
| [index.ts](index.ts)                           | A pizza shop exercise with a menu, cash register, orders, and lookup functions.                                                                                   |
| [package.json](package.json)                   | Defines the two watch commands above.                                                                                                                             |
| [.vscode/settings.json](.vscode/settings.json) | Configures the Code Runner extension to run TypeScript in the terminal using watch mode.                                                                          |
| [index.html](index.html)                       | An HTML page referencing `index.ts`. The terminal examples run independently of this page. Browsers need JavaScript output or tooling that transforms TypeScript. |

## Types, objects, and optional properties

A type describes the shape of a value. In `practice.ts`, `Person` describes an object and reuses the `Address` type for its nested address:

```ts
type Person = {
  name: string;
  age: number;
  isStudent: boolean;
  address?: Address;
};
```

`name` must be a string, `age` a number, and `isStudent` a boolean. The `?` makes `address` optional, so both `person` and `person2` are valid even though only `person` has an address.

`displayPersonInfo()` uses optional chaining:

```ts
person.address?.city;
```

If the address is missing, this produces `undefined` instead of throwing an error. That is why the current output for Mary includes `lives in undefined`. An optional fallback would be:

```ts
person.address?.city ?? 'an unknown city';
```

## Arrays, inference, and allowed values

An array type describes its items:

```ts
const ages: number[] = [23, 43, 13, 41];
const people: Person[] = [person, person2];
```

`Person[]` and `Array<Person>` mean the same thing.

TypeScript can also infer types from values:

```ts
let userName = 'Peter'; // Inferred as string
const userName2 = 'Santiago'; // Inferred as the literal type 'Santiago'
```

A literal type represents one exact value. A union combines allowed types or values:

```ts
role: 'guest' | 'member' | 'admin';
```

The `User` type accepts those three role values. `User['role']` reuses the type of that property:

```ts
let userRole: User['role'] = 'member';
```

## Changing data and returning a value

**`return` sends a value back to the caller and ends that function call. It does not modify data by itself.** A function can change data, return a value, or do both.

In `updateUser()`, these lines have separate jobs:

```ts
Object.assign(user, updates); // Changes the existing user object
return user; // Gives that object back to the caller
```

`.find()` returns the matching object from `users`, so updating that object also changes what you see in the array. `Object.assign()` copies the provided properties onto it.

Returning the user lets you use the result immediately:

```ts
const updatedUser = updateUser(1, { username: 'john_disciple' });
console.log(updatedUser);
```

You can also ignore the result:

```ts
updateUser(4, { role: 'member' });
console.log(users); // The array still contains the updated user
```

If you removed `return user`, the update would still happen. The function would then have a `void` return type, and its runtime result would be `undefined`.

| Return type          | Meaning in these examples                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `void`               | The caller receives no usable result, as with `displayPersonInfo()`.                                  |
| `User`               | A normally completed call returns a user, as with `fetchUserDetails()`.                               |
| `Order \| undefined` | The function returns an order when successful, or `undefined` when it cannot find the requested data. |

`fetchUserDetails()` and `updateUser()` throw an error when no user matches. Throwing interrupts the call instead of returning a user. `placeOrder()` and `completeOrder()` instead log an error and use a bare `return`, which exits with `undefined`.

The current `addNewPizza()` also demonstrates doing both jobs: it adds a pizza to `menu` **and** returns the new pizza with its generated ID. An earlier version only added the pizza and had a `void` return type. Both designs work; returning the pizza makes it available to the caller.

## Utility types: `Partial` and `Omit`

Utility types create a new type from an existing one. They do not change runtime objects.
This are some of the utilities, to learn more, check [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#handbook-content)

`Partial<User>` makes every property optional, allowing `updateUser()` to accept just the fields being changed:

```ts
updateUser(1, { username: 'john_disciple' });
updateUser(4, { role: 'member' });
```

`Omit<User, 'id'>` describes a user without the `id` property. `addNewUser()` accepts that input, generates an ID, stores the complete user, and returns it:

```ts
function addNewUser(newUser: Omit<User, 'id'>): User {
  const user: User = { id: nextUserId++, ...newUser };
  users.push(user);
  return user;
}
```

`nextUserId++` uses the current ID and then increments the counter. `...newUser` copies the input's properties into the new object. `addNewPizza()` uses the same pattern with `Omit<Pizza, 'id'>`.

## Generics: reusing logic while keeping types

A generic introduces a type parameter, such as `T`, that stands for a type supplied or inferred for a call. It connects the types of the inputs and result.[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content)

```ts
function getLastItem<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
```

Read this as: "Accept an array of items of type `T`, and return an item of that type or `undefined`."

```ts
getLastItem(scores); // T is number; returns 9
getLastItem(favoriteThings); // T is string; returns 'warm woolen mittens'
getLastItem(voters); // T is the voter object type; returns Bob's object
getLastItem<number>([]); // Returns undefined because the array is empty
```

`T` is a name for a type, not a runtime variable. Generics let one implementation work with different types while preserving type information.

In `index.ts`, `addToArray()` uses the same idea:

```ts
function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}
```

`addToArray<Pizza>(...)` checks that the item is a `Pizza`; `addToArray<Order>(...)` checks that it is an `Order`. The function changes the original array and returns that same array.

## How the pizza shop works

`Pizza` describes an ID, name, and price. `Order` contains its own ID, a pizza, and a status of either `'ordered'` or `'completed'`.

| Function                     | Behavior                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `addNewPizza(pizza)`         | Generates a pizza ID, adds the pizza to the menu, and returns it.                |
| `placeOrder(pizzaName)`      | Finds a pizza, adds its price to the register, creates an order, and returns it. |
| `completeOrder(orderId)`     | Changes the matching order's status to `'completed'` and returns it.             |
| `getPizzaDetail(identifier)` | Finds a pizza by its name or numeric ID.                                         |
| `addToArray<T>(array, item)` | Adds a typed item to an array and returns the array.                             |

The register starts at `100`. A successful `placeOrder('Pepperoni')` adds `10`, producing `110`. Completing an order only changes its status; it does not add money again. `.find()` selects the first matching item, which matters if the menu contains duplicate names.

The current order calls are commented out. The active examples use `addToArray()` to add BBQ Chicken to the menu and a completed Caprichosa order directly to the queue. Adding directly to the queue does not call `placeOrder()`, so the register stays at `100`. Its log is currently commented out too.

## Union parameters and type narrowing

`getPizzaDetail()` accepts either a name or an ID:

```ts
function getPizzaDetail(identifier: string | number): Pizza | undefined;
```

Checking `typeof identifier === 'string'` narrows the type to `string` within that branch, allowing string methods. The number branch compares pizza IDs. Name comparisons ignore capitalization by converting both names to lowercase.

Example calls you can add or uncomment:

```ts
console.log(getPizzaDetail('Pepperoni')); // Pizza with ID 2
console.log(getPizzaDetail(3)); // Hawaiana
console.log(getPizzaDetail('Missing')); // undefined
```

Type annotations guide TypeScript's checks; they do not validate external input at runtime. The function also includes a runtime error for identifiers that are neither strings nor numbers.
