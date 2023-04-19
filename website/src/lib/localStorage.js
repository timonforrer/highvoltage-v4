function getStorage(key) {
  let data = localStorage.getItem(key);
  if (data !== null && (data.startsWith('{') || data.startsWith('['))) {
    data = JSON.parse(data);
  }
  return data;
}

function setStorage(key, _data) {
  let data = _data;
  if (typeof _data !== 'string') {
    data = JSON.stringify(data);
  }
  localStorage.setItem(key, data);
}

function computeSummary() {}

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

  console.log({cartItems, itemAlreadyInCart});
}

export {
  addSku,
  getStorage,
  setStorage,
}
