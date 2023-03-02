const EleventyFetch = require('@11ty/eleventy-fetch');
const fetch = require('node-fetch');
const arrToObject = require('./arrToObject');

module.exports = async function fetchFromSanity({
  query,
  identifier
}) {
  // define the return object as a global variable
  let RETURN_OBJECT = {}

  // escape special characters, so the query can be passed to the URL
  let encodedQuery = encodeURIComponent(query);

  // complete url consisting of <project_id>.api.sanity.io/<api version as YYYY-MM-DD>
  let url = `https://0j5eyb7h.api.sanity.io/v2023-02-02/data/query/production?query=${encodedQuery}`;

  const options = {
    headers: {
      'Authorization': `Bearer ${process.env.SANITY_TOKEN}`
    }
  };

  // if in serverless environment, get latest versions of all published and drafted documents
  if (process.env.ELEVENTY_SERVERLESS) {
    const res = await fetch(url, options);
    // get JSON body from response
    let data = await res.json();
    // assign data to return object
    RETURN_OBJECT = data;
  }

  // if opted out of caching use node fetch to get fresh content
  if (process.env.NO_CACHE) {
    const res = await fetch(url, options);
    // get JSON body from response
    let data = await res.json();
    // remove drafts
    data = data.result.filter(page => !page._id.startsWith('drafts.'))
    // assign data to return object
    RETURN_OBJECT = data;
  }

  // default case: fetching the data with EleventyFetch for caching
  let data = await EleventyFetch(url, {
    duration: '1d',
    type: 'json',
    fetchOptions: options
  });


  // data.result.map(page => console.log(page))
  // remove drafts
  data = data.result.filter(page => !page._id.startsWith('drafts.'));
  
  // assign data to return object
  RETURN_OBJECT = data;
  
  // if an identifier is specified, turn array into object
  if (identifier !== undefined) {
    RETURN_OBJECT = arrToObject(RETURN_OBJECT, identifier)
  }

  return RETURN_OBJECT
}
