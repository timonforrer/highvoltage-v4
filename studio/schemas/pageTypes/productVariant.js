import { filterRefByLang } from "../../utils";

export default {
  name: 'productVariant',
  title: 'Product Variant',
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
      name: 'productCategory',
      title: 'Product category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      options: {filter: filterRefByLang}
    },
    {
      name: 'variantIdentifier',
      type: 'string',
    },
    {
      name: 'productSkus',
      title: 'SKUs',
      type: 'array',
      of: [
        {
          name: 'productSku',
          title: 'SKU',
          type: 'reference',
          to: [{ type: 'productSku' }],
          options: {filter: filterRefByLang}
        },
      ],
    },
    {
      name: 'bullets',
      type: 'object',
      description: 'Will be overridden by bullets on SKUs',
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
      name: 'mainImage',
      type: 'image',
      description: 'Will be overridden by main image on SKUs',
      options: {
        hotspot: true
      }
    },
    {
      name: 'supplementaryImages',
      type: 'array',
      description: 'Will be placed after any supplementary images from SKUs',
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
      name: 'dimensions',
      type: 'array',
      of: [
        {
          name: 'item',
          type: 'object',
          fields: [
            {
              name: 'productSku',
              title: 'SKU',
              type: 'reference',
              to: [{ type: 'productSku' }],
              options: {filter: filterRefByLang}
            },
            {
              name: 'width',
              title: 'Width (cm)',
              type: 'number'
            },
            {
              name: 'height',
              title: 'Height (cm)',
              type: 'number'
            }
          ],
          preview: {
            select: {
              variant: 'productSku.variant',
              width: 'width',
              height: 'height'
            },
            prepare(selection) {
              const { variant, width, height } = selection;
              return {
                title: `Grösse: ${variant} (${width} x ${height} cm)`,
              }
            },
          }
        },
      ]
    },
    {
      name: 'blocks',
      type: 'array',
      description: 'Will be placed after any content blocks from SKU',
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