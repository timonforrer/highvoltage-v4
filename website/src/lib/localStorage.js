// read from localStorage and parse JSON if needed
function getStorage(key) {
  let data = localStorage.getItem(key);
  if (data !== null && (data.startsWith('{') || data.startsWith('['))) {
    data = JSON.parse(data);
  }
  return data;
}

// write to localStorage with JSON support
function setStorage(key, _data) {
  let data = _data;
  if (typeof _data !== 'string') {
    data = JSON.stringify(data);
  }
  localStorage.setItem(key, data);
}

// summary of items in cart (totalItems, totalQuantity)
function computeSummary() {

  const cart_items = getStorage('cart_items');

  let totalPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < cart_items.length; i++) {
    totalPrice += cart_items[i].itemPrice * cart_items[i].quantity;
    totalQuantity += cart_items[i].quantity;
  }

  return {
    totalPrice,
    totalQuantity,
  }
}

// add sku to localStorage
function addSku({
  itemPrice,
  sku,
  title,
 }) {

  const cartItems = getStorage('cart_items') ?? [];
  const itemAlreadyInCart = cartItems.some(item => item.sku === sku);

  if (!itemAlreadyInCart) {
    cartItems.push({
      itemPrice,
      sku,
      title,
      quantity: 1
    });
  }

  if (itemAlreadyInCart) {
    const itemIndex = cartItems.findIndex(item => item.sku === sku);
    cartItems[itemIndex].quantity++;
  }

  setStorage('cart_items', cartItems);
  const summary = computeSummary();
  setStorage('cart_summary', summary);
}

function removeSku(sku) {
  const cartItems = getStorage('cart_items');
  const index = cartItems.findIndex(item => item.sku === sku);
  cartItems.splice(index, 1);

  setStorage('cart_items', cartItems);
  const summary = computeSummary();
  setStorage('summary', summary);

  console.log({cartItems});
}

export {
  addSku,
  getStorage,
  removeSku,
  setStorage,
}
