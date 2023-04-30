const { default: shoppingCartInnerHTML } = await import(`../svg/shopping-cart.svg?raw`);
const { default: trashCanInnerHTML } = await import(`../svg/trash-can.svg?raw`);
const svg = (icon) => `
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    ${icon}
  </svg>
`;

const shoppingCartIcon = svg(shoppingCartInnerHTML);
const trashCanIcon = svg(trashCanInnerHTML);

export {
  shoppingCartIcon,
  trashCanIcon,
};
