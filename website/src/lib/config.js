/**
 * This file should not really exist – is used for vercel api
 * Could be relocated to dedicated `airtable.js` and `sanity.js` files
 */

const airtableConfig = {
  endpointUrl: 'https://api.airtable.com',
  // somehow the apiKey is not necessary?
  // apiKey: process.env.AIRTABLE_API_KEY
};

const sanityConfig = {
  projectId: '0j5eyb7h',
  dataset: 'production',
  apiVersion: '2023-01-16',
  // somehow the apiKey is not necessary?
  // token: process.env.SANITY_IMPORT,
  useCdn: false
};

export {
  airtableConfig,
  sanityConfig
};
