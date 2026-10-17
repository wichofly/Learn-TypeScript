type Pizza = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: 'ordered' | 'completed';
};

const menu: Pizza[] = [
  { name: 'Margherita', price: 8 },
  { name: 'Pepperoni', price: 10 },
  { name: 'Hawaiian', price: 10 },
  { name: 'Veggie', price: 9 },
];

let cashInRegister: number = 100;
let nextOrderId: number = 1;
const orderQueue: Order[] = [];

/**
 * Challenge: Add a utility function "addNewPizza" that takes a pizza object
 * and adds it to the menu.
 */

function addNewPizza(pizza: Pizza) {
  menu.push(pizza);
}

/**
 * Write another utility function, placeOrder, that takes a pizza name parameter and:
 * 1. finds that pizza object in the menu,
 * 2. adds the income to the cashInRegister,
 * 3. pushes a new "order object" to the orderQueue
 *    (e.g. { pizza: selectedPizzaObjectFromStep1, status: "ordered" })
 * 4. returns the new order object (just in case we need it later)
 */

function placeOrder(pizzaName: string) {
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

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.id === orderId);

  if (order) order.status = 'completed';

  return order;
}

addNewPizza({ name: 'BBQ Chicken', price: 11 });
addNewPizza({ name: 'Pepperoni', price: 11 });
addNewPizza({ name: 'Diavola', price: 12 });

placeOrder('Pepperoni');
completeOrder(2);

console.log('Menu', menu);
console.log('Cash in Register', cashInRegister);
console.log('Order Queue', orderQueue);
