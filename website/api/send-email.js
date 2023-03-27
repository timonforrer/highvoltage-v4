// const sg = require('@sendgrid/mail');

import { form as formQuery } from '../src/lib/queries.js';
import { getSanityData } from '../src/lib/sanity.js';

export default async function (req, res) {
  // sg.setApiKey(process.env.VA_SENDGRID_API_KEY);
  const { redirect, id } = req.body;
  const form = await getSanityData({ query: formQuery, params: {$id: id} });
  
  res.redirect(307, redirect);
}
