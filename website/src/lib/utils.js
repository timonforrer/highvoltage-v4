import { getAirtableData } from '../lib/airtable';
import { getSanityData } from '../lib/sanity';
import { productSkus } from '../lib/queries';

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

export {
  replacer,
  basicPopulatedSkus
}
