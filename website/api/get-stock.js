import Airtable from 'airtable';
import { airtableConfig } from '../src/lib/config.js';
import { fetchHelper } from '../src/lib/airtable.js';

export default async function handler(req, res) {

  const { sku } = req.query;

  Airtable.configure(airtableConfig);
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_SHOP);

  let stock;

  if (sku) {
    // if sku is provided, fetch stock for that sku
    const product = (await fetchHelper({
      table: airtable('Artikel'),
      view: 'Lager',
      filter: `Artikelnummer="${sku}"`
    }))[0];
    stock = product.fields['Lager ist'];
  } else {
    // otherwise fetch all products
    const products = await fetchHelper({
      table: airtable('Artikel'),
      view: 'Lager'
    });
    stock = products.map(product => {
      return {
        sku: product.fields['Artikelnummer'],
        quantity: product.fields['Lager ist']
      }
    });
  }

  return res.json({
    sku,
    stock
  });
}
