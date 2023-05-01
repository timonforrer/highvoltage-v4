import Stripe from 'stripe';
import Airtable from 'airtable';
import { airtableConfig } from '../src/lib/config.js';
import { createSale, fetchHelper } from '../src/lib/airtable.js';

export default async function (req, res) {

  const dev = process.env.dev === 'true';
  const key = dev
    ? process.env.STRIPE_API_TEST_SECRET
    : process.env.STRIPE_API_LIVE_SECRET;

  const stripe = new Stripe(key);
  Airtable.configure(airtableConfig);
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_SHOP);

  let {
    firstName,
    lastName,
    email,
    street,
    zipCode,
    city,
    country,
    cart_items,
    redirect,
  } = req.body;

  cart_items = decodeURIComponent(cart_items);
  cart_items = JSON.parse(cart_items);

  const host = dev ? 'http://localhost:3000' : 'https://www.voltagearc.com';
  redirect = host + redirect;

  const airtable_products = await fetchHelper({
    table: airtable('Artikel'),
    view: 'Artikelinfos',
  });

  const airtable_shipping_costs = await fetchHelper({
    table: airtable('Portokosten'),
    view: 'Default',
  });

  const products_for_airtable_sale = cart_items.map(item => {
    const airtable_item = airtable_products.find(_airtable_item => (
      item.sku === _airtable_item.fields['Artikelnummer']
    ));
    return {
      "fields": {
        "Artikel": [airtable_item.id],
        "Preis pro Artikel": airtable_item.fields['Verkaufspreis Onlineshop'],
        "Anzahl": Number(item.quantity),
      }
    }
  });

  const line_items = cart_items.map(item => {
    const airtable_item = airtable_products.find(airtable_item => (
      item.sku === airtable_item.fields['Artikelnummer']
    ));

    return {
      price_data: {
        currency: 'chf',
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
    cancel_url: 'https://www.voltagearc.com/cancelled/',
    customer_email: email,
    line_items,
    mode: 'payment',
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate: dev
          ? shipping_rate.fields.stripe_shipping_rate_test
          : shipping_rate.fields.stripe_shipping_rate,
      }
    ],
    success_url: redirect,
  }).catch(err => console.error(err));

  await createSale({
    customer_data: {
      firstName,
      lastName,
      email,
      street,
      zipCode,
      city,
      country
    },
    session_id: session.id,
    products: products_for_airtable_sale,
    shipping_costs: shipping_rate,
  });

  res.redirect(303, session.url);
}
