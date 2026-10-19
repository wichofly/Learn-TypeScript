type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: 'ordered' | 'completed';
};

let cashInRegister: number = 100;
let nextOrderId: number = 1;
let nextPizzaId: number = 1;
const orderQueue: Order[] = [];

const menu: Pizza[] = [
  { id: nextPizzaId++, name: 'Margherita', price: 8 },
  { id: nextPizzaId++, name: 'Pepperoni', price: 10 },
  { id: nextPizzaId++, name: 'Hawaiana', price: 10 },
  { id: nextPizzaId++, name: 'Veggie', price: 9 },
];

/**
 * Challenge: Add a utility function "addNewPizza" that takes a pizza object
 * and adds it to the menu.
 */

function addNewPizza(pizza: Pizza): void {
  menu.push(pizza);
}

addNewPizza({ id: nextPizzaId++, name: 'BBQ Chicken', price: 11 });
addNewPizza({ id: nextPizzaId++, name: 'Caprichosa', price: 11 });
addNewPizza({ id: nextPizzaId++, name: 'Diavola', price: 12 });

/**
 * Write another utility function, placeOrder, that takes a pizza name parameter and:
 * 1. finds that pizza object in the menu,
 * 2. adds the income to the cashInRegister,
 * 3. pushes a new "order object" to the orderQueue
 *    (e.g. { pizza: selectedPizzaObjectFromStep1, status: "ordered" })
 * 4. returns the new order object (just in case we need it later)
 */

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzObj) => pizzObj.name === pizzaName);

  if (!selectedPizza) {
    console.error(`${pizzaName} is not on the menu`);
    return;
  }

  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++, // Increment the order ID for each new order
    pizza: selectedPizza,
    status: 'ordered',
  };
  orderQueue.push(newOrder);
  return newOrder;
}

/**
 * Challenge: write another utility function, completeOrder, that takes an orderId as a parameter
 * finds the correct order in the orderQueue, and marks its status as "completed". For good measure,
 * return the found order from the function.
 *
 * Note: you'll need to ensure that we're adding IDs to our orders when we create new orders. You can use a global `nextOrderId` variable and increment it every time a new order is created to simulate real IDs being managed for us by a database.
 */

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);

  if (!order) {
    console.error(`Order with ID ${orderId} not found`);
    return;
  }

  order.status = 'completed';
  return order;
}

/**
 * Challenge: create a new utility function called getPizzaDetail. It will take
 * a parameter called `identifier`, but there's a twist: we want this identifier
 * to be allowed to either be the string name of the pizza (e.g. "Pepperoni"),
 * OR to be the number ID of the pizza (e.g. 2).
 *
 * write the code to check if the parameter is a string
 * or a number, and use the menu.find() method accordingly
 */

// Type Narrowing is a way to narrow down the type of a variable within a conditional block.
// In this case, we can use the `typeof` operator to check if the `identifier` is a string or a number, and then use the appropriate logic to find the pizza in the menu.

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === 'string') {
    return menu.find(
      (pizza) =>
        pizza.name.toLocaleLowerCase() === identifier.toLocaleLowerCase(),
    );
  } else if (typeof identifier === 'number') {
    return menu.find((pizza) => pizza.id === identifier);
  } else throw new TypeError('Identifier must be a string or a number');
}

// placeOrder('Pepperoni');
// placeOrder('Diavola');
// completeOrder(2);

console.log('Menu', menu);
// console.log('Cash in Register', cashInRegister);
// console.log('Order Queue', orderQueue);
// console.log('Order completed', completeOrder(2));
// console.log('Pizza detail', getPizzaDetail(3));
