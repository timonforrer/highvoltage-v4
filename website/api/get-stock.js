import Airtable from 'airtable';
import { airtableConfig } from '../src/lib/config.js';
import { fetchHelper } from '../src/lib/airtable.js';

export default async function handler(req, res) {

  const { sku } = req.query;

  Airtable.configure(airtableConfig);
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_SHOP);

  // get all gigs from airtable
  let product = (await fetchHelper({
    table: airtable('Artikel'),
    view: 'Lager',
    filter: `Artikelnummer="${sku}"`
  }))[0];

  let stock = product.fields["Lager ist"];

  return res.json({
    sku,
    stock
  });
}
