import Airtable from 'airtable';

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

export { fetchHelper };

export async function getAirtableData({ base: baseKey, table, view = 'Default', filter = '' }) {
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
