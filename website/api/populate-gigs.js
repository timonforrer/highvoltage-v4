// import clients
const Sanity = require('@sanity/client');
const Airtable = require('airtable');
// import helper function for handling queries to the airtable database
import { airtableFetch } from '../utils/airtableFetch';

export default async function handler(req, res) {

  // configure clients
  const sanity = Sanity({
    projectId: '0j5eyb7h',
    dataset: 'production',
    apiVersion: '2023-01-16',
    token: process.env.SANITY_IMPORT,
    useCdn: false
  });
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
  });
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_MASTER);

  // get all gigs from airtable
  let airtableGigs = await airtableFetch({
    table: airtable('Gigs'),
    view: 'Default',
    filter: 'Status="Definitiv"'
  });
  // only extract relevant fields
  airtableGigs = airtableGigs.map(item => {
    let { fields } = item;
    return {
      slug: fields['Slug'],
      finalSlug: `/konzerte/${fields['Slug']}`,
      id: fields['Id'],
      name: fields['Name'],
      startDate: fields['Start'],
    };
  });

  // sanity query
  const sanityQuery = `*[_type=="gig"]{
    internal {
      airtableId
    }
  }`;
  // get gigs from sanity
  let sanityGigs = await sanity.fetch(sanityQuery, {});

  const onlyInAirtable = airtableGigs.filter(airtableValue => {
    return !sanityGigs.some(sanityValue => {
      return airtableValue.id === sanityValue.internal?.airtableId
    });
  });

  // function to map airtable object to sanity object
  const transform = (airtableInput) => {
    return {
      __i18n_lang: 'de',
      _type: 'gig',
      meta: {
        title: airtableInput.name,
        slug: {
          _type: 'slug',
          current: airtableInput.finalSlug
        }
      },
      internal: {
        airtableId: airtableInput.id,
        startDate: airtableInput.startDate.split('T')[0]
      }
    }
  }

  // transform the documents
  let transformedDocuments = onlyInAirtable.map(doc => transform(doc));

  // write to sanity
  let transaction = sanity.transaction();
  transformedDocuments.forEach(doc => {
    transaction.create(doc);
  });
  
  // sanity
  //   .delete({query: '*[_type == "gig"]'})
  //   .then(() => res.status(200).json({message: 'deleted!'}))
  //   .catch(err => res.status(500).json({err}))

  transaction
    .commit()
    .then(() => {
      res.status(200).json({message: 'created!'});
    })
    .catch((err) => {
      res.status(500).json({err});
    });
}
