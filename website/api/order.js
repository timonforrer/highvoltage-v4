import Stripe from 'stripe';
import Airtable from 'airtable';
import { airtableConfig } from '../src/lib/config.js';
import { fetchHelper } from '../src/lib/airtable.js';

export default async function (req, res) {

  const dev = process.env.dev==='true';
  const key = dev
    ? process.env.STRIPE_API_TEST_SECRET
    : process.env.STRIPE_API_LIVE_SECRET;

  const stripe = new Stripe(key);

  let {
    cart_items,
    country,
    email,
    redirect,
  } = req.body;

  cart_items = decodeURIComponent(cart_items);
  cart_items = JSON.parse(cart_items);

  const host = dev ? 'http://localhost:3000' : 'https://www.voltagearc.com';
  redirect = host + redirect;

  Airtable.configure(airtableConfig);
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_SHOP);

  const airtable_products = await fetchHelper({
    table: airtable('Artikel'),
    view: 'Artikelinfos',
  });

  const airtable_shipping_costs = await fetchHelper({
    table: airtable('Portokosten'),
    view: 'Default',
  });

  const line_items = cart_items.map(item => {
    const airtable_item = airtable_products.find(product => (
      item.sku === product.fields['Artikelnummer']
    ));

    return {
      price_data: {
        currency: 'CHF',
        product_data: {
          name: item.title,
          metadata: {
            SKU: item.sku,
          },
        },
        unit_amount: airtable_item.fields['Verkaufspreis Onlineshop'] * 100,
      },
      quantity: item.quantity,
    }
  });

  const shipping_rate = airtable_shipping_costs.find(item => (
    item.fields['Ländercode'] === country
  ));

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    shipping_options: [
      {
        shipping_rate: dev
          ? shipping_rate.fields.stripe_shipping_rate_test
          : shipping_rate.fields.stripe_shipping_rate,
      }
    ],
    success_url: redirect,
  });

  res.redirect(303, session.url);
}
