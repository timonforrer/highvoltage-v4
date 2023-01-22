/**
 * This api endpoint will create all necessary documents for the shop inside of sanity
 * These include:
 * - SKUs
 * - Variant Controllers
 * - Categories
 */

// import clients
import Sanity from '@sanity/client';
import Airtable from 'airtable';

// import client configuration
import {airtableConfig, sanityConfig} from '../config/clients';

// import helper function for handling queries to the airtable database
import {airtableFetch} from '../utils/airtableFetch';

// import helper to remove duplicates from array
import {removeDuplicates} from '../utils/removeDuplicates';

// import util to generate id (cannot contain special chars etc., so slugify does the trick)
import slugify from 'slugify'

export default async function handler(req, res) {
  // configure clients
  const sanity = Sanity(sanityConfig);

  Airtable.configure(airtableConfig);
  const airtable = Airtable.base(process.env.AIRTABLE_API_BASE_SHOP);

  // get all gigs from airtable
  let airtableSKUs = await airtableFetch({
    table: airtable('Artikel'),
    view: 'Alle Felder',
    filter: '{In Online Shop}=true()'
  });

  // prepare SKU fields for creation in sanity
  let SKUs = airtableSKUs.map(({ fields: {
    Artikelname: name,
    Zusatzinfos: variant,
    Artikelnummer: id,
    'Gruppen ID': variantId
  }}) => ({
    __i18n_lang: 'de',
    _type: 'productSku',
    _id: `airtable-product-sku-${id.toLowerCase()}`,
    meta: {
      title: `${name} – ${variant}`,
      slug: {
        _type: 'slug',
        current: `/shop/${id.toLowerCase()}`
      }
    },
    sku: id,
    variant: variant,
    variantId: variantId
  }));

  // prepare category fields for creation in sanity
  let categories = airtableSKUs.map(({ fields: {
    Typ: type
  }}) => ({
    __i18n_lang: 'de',
    _id: `airtable-product-category-${slugify(type, { lower: true })}`,
    _type: 'productCategory',
    title: type
  }));

  // remove duplicates
  categories = removeDuplicates({array: categories, key: 'title'});

  // prepare variant fields for creation in sanity
  let variants = airtableSKUs.map(({ fields: { 'Gruppen ID': variantId, Typ: type, Artikelname: title }}) => {

    // only select skus, that should be part of this variant controller
    let filteredSkus = SKUs.filter((sku) => sku.variantId === variantId);
    // prepare the fields for sanity
    filteredSkus = filteredSkus.map(({ _id }) => ({
      _key: _id,
      _type: 'productSku',
      _ref: _id
    }));

    // generate the id for the category
    const categoryId = `airtable-product-category-${slugify(type, { lower: true })}`;
    // get the applicable category
    let filteredCategory = categories.filter(({ _id }) => categoryId === _id)[0];
    // prepare the fields for sanity
    const category = {
      _type: 'reference',
      _ref: filteredCategory._id
    };

    return {
      __i18n_lang: 'de',
      _id: `airtable-product-variant-${variantId}`,
      _type: 'productVariant',
      productCategory: category,
      productSkus: filteredSkus,
      meta: {
        title: title
      }
    }
  });

  // remove duplicates
  variants = removeDuplicates({array: variants, key: '_id'});

  // prepare transactions for all documents
  let transaction = sanity.transaction();
  variants.forEach(doc => transaction.createIfNotExists(doc));
  categories.forEach(doc => transaction.createIfNotExists(doc));
  SKUs.forEach(doc => transaction.createIfNotExists(doc));
  
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
