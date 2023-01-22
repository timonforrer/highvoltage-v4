import { filterRefByLang } from "../../utils";

export default {
  name: 'productSku',
  title: 'Product SKU',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'meta',
      type: 'meta'
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string'
    },
    {
      name: 'variantId',
      title: 'Variant ID',
      type: 'string'
    },
    {
      name: 'bullets',
      type: 'object',
      description: 'These bullets will overridden the bullets specified on the variant controller',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {name: 'b1', title: '1', type: 'string'},
        {name: 'b2', title: '2', type: 'string'},
        {name: 'b3', title: '3', type: 'string'},
        {name: 'b4', title: '4', type: 'string'},
        {name: 'b5', title: '5', type: 'string'},
        {name: 'b6', title: '6', type: 'string'},
      ],
    },
    {
      name: 'variant',
      type: 'string',
    },
    {
      name: 'mainImage',
      type: 'image',
      description: 'This image will override the main image specified on the variant controller',
      options: {
        hotspot: true
      }
    },
    {
      name: 'supplementaryImages',
      type: 'array',
      description: 'These images will be placed before any supplementary image specified on the variant controller',
      options: {
        layout: 'grid'
      },
      of: [
        {
          name: 'supplementaryImage',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'blocks',
      type: 'array',
      description: 'These content blocks well be placed before any content specified on the variant controller',
      of: [
        {
          name: 'richtext',
          title: 'Richtext',
          type: 'arrayRichtext'
        },
        {
          name: 'reviews',
          title: 'Reviews',
          type: 'reference',
          to: [{type: 'reviews'}],
          options: {filter: filterRefByLang}
        },
        {
          name: 'videos',
          title: 'Videos',
          type: 'reference',
          to: [{type: 'videos'}],
        },
        {
          name: 'tracks',
          title: 'Tracks',
          type: 'reference',
          to: [{type: 'tracks'}],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}