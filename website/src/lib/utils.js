import { getAirtableData } from '../lib/airtable.js';

const replacer = ({string, data}) => string.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
  return typeof data[key] !== 'undefined' ? data[key] : match;
});

const basicPopulatedSkus = async ({ baseSkus }) => {
  const airtableSkus = await getAirtableData({
    table: 'Artikel',
    base: 'shop',
    view: 'Online',
  });

  const skus = airtableSkus.filter(airtableSku => {
    return baseSkus.some(sku => airtableSku['Artikelnummer'] === sku.sku);
  });

  return {
    skus
  }
}

const removeMultiSlash = (string, { removeTrailing } = {}) => {
  let newString = `/${string}/`.replace(/\/{2,}/g, '/');
  if (removeTrailing) {
    newString = newString.replace(/^\/+|\/+$/g, '')
  }
  return newString;
};

function removeDuplicates({array, key}) {
  return array.filter((item, index, self) => (
    index === self.findIndex((t) => (
      t[key] === item[key]
    ))
  ))
};

function render(content, node, mode = 'append') {
  const template = document.createElement('template');
  template.innerHTML = content;
  const parsedContent = template.content.cloneNode(true);
  switch (mode) {
    case 'insertAfter':
      node.parentNode.insertBefore(parsedContent, node.nextSibling);
      break;
    case 'insertBefore':
      node.parentNode.insertBefore(parsedContent, node);
      break;
    case 'append':
      node.appendChild(parsedContent);
      break;
  }
};

export {
  basicPopulatedSkus,
  removeMultiSlash,
  removeDuplicates,
  render,
  replacer,
}
