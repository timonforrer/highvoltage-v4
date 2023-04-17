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

export {
  basicPopulatedSkus,
  removeMultiSlash,
  removeDuplicates,
  replacer,
}
