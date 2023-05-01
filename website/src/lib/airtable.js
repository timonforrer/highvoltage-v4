import Airtable from 'airtable';
import { airtableConfig } from './config.js';

const fetchHelper = ({ table, view, filter }) => {
  let records = [];

  return new Promise((resolve, reject) => {
    if (records.length > 0) {
      resolve(records);
    };

    const processPage = (partialRecords, fetchNextpage) => {
      records = [...records, ...partialRecords];
      fetchNextpage();
    };

    const processRecords = (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(records);
    };

    table.select({ view, filterByFormula: filter ? filter : '' }).eachPage(processPage, processRecords);
  });
};

async function getAirtableData({ base: baseKey, table, view = 'Default', filter = '' }) {
  const config = {
    endpointUrl: 'https://api.airtable.com',
    apiKey: import.meta.env.AIRTABLE_API_KEY
  };

  Airtable.configure(config);

  const keyMap = {
    master: import.meta.env.AIRTABLE_API_BASE_MASTER,
    shop: import.meta.env.AIRTABLE_API_BASE_SHOP
  };

  let key = keyMap[baseKey];
  
  if (key === undefined) {
    throw new Error(`Wrong table key. Must be of ${
        new Intl.ListFormat('en', {type: 'disjunction'}).format(Object.keys(keyMap))
    }`);
  };

  const base = Airtable.base(key);

  let records = await fetchHelper({
    table: base(table),
    view,
    filter,
  });

  records = records.map(record => ({
    id: record.id,
    ...record.fields
  }));

  return records;
};

async function createSale({
  customer_data: {
    firstName,
    lastName,
    email,
    street,
    zipCode,
    city,
    country,
  },
  products,
  session_id,
  shipping_costs,
}) {
  try {
    Airtable.configure(airtableConfig);
    const base = Airtable.base(process.env.AIRTABLE_API_BASE_SHOP);

    const saleRecord = await base('Verkäufe').create({
      "Datum": (new Date()).toISOString().split('T')[0],
      "E-Mail": email,
      "Vorname, Name": `${firstName} ${lastName}`,
      "Strasse": street,
      "PLZ": Number(zipCode),
      "Ort": city,
      "Land": country,
      "Porto": shipping_costs.fields['Portokosten'],
      "Verkäufer": "Online Shop",
      "_stripe_payment_success": false,
      "_stripe_dev_test": (process.env.dev === 'true'),
      "_stripe_session_id": session_id,
    });

    const saleId = saleRecord.getId();

    // add sale id to every product
    products.forEach(product => {
      product.fields['Gehört zu Verkauf'] = [saleId];
    });

    await base('Artikel in Verkäufen').create(products);

  } catch (error) {
    // Handle errors here
    console.error(error);
    // Throw the error or handle it as needed
    throw error;
  }
}

export { fetchHelper, getAirtableData, createSale };
