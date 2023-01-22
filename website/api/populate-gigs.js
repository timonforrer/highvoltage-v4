// import clients
import Sanity from '@sanity/client';
import Airtable from 'airtable';

// import client configuration
import {airtableConfig, sanityConfig} from '../config/clients';

// import helper function for handling queries to the airtable database
import {airtableFetch} from '../utils/airtableFetch';

export default async function handler(req, res) {

  // configure clients
  const sanity = Sanity(sanityConfig);

  Airtable.configure(airtableConfig);
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_MASTER);

  // get all gigs from airtable
  let airtableGigs = await airtableFetch({
    table: airtable('Gigs'),
    view: 'Default',
    filter: 'Status="Definitiv"'
  });

  // prepare fields for creation in sanity
  airtableGigs = airtableGigs.map(({ fields: { Slug: slug, Id: id, Name: name, Start: start } }) => (
    {
      __i18n_lang: 'de',
      _type: 'gig',
      meta: {
        title: name,
        slug: {
          _type: 'slug',
          current: `/konzerte/${slug}`
        }
      },
      internal: {
        airtableId: id,
        startDate: start.split('T')[0]
      }
    })
  );

  // sanity query
  const sanityQuery = `*[_type=="gig"]{
    internal {
      airtableId
    }
  }`;

  // get gigs from sanity
  let sanityGigs = await sanity.fetch(sanityQuery, {});

  // filter out any gig, that is present in airtable and in the sanity database
  const onlyInAirtable = airtableGigs.filter(airtableValue => {
    return !sanityGigs.find(({ internal: { airtableId } }) => airtableValue.internal.airtableId === airtableId);
  });

  // prepare transactions for any document, that is missing in sanity
  let transaction = sanity.transaction();
  onlyInAirtable.forEach(doc => {
    transaction.create(doc);
  });

  // execute transaction
  transaction
    .commit()
    .then(() => {
      res.status(200).json({message: 'created!'});
    })
    .catch((err) => {
      res.status(500).json({err});
    });
}
