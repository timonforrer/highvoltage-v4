export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'renderTitle',
      type: 'boolean',
    },
    {
      name: 'description',
      type: 'richtext'
    },
    {
      name: 'layout',
      type: 'object',
      fields: [
        {
          name: 'columns',
          type: 'number',
          options: {
            list: [1,2,3]
          }
        },
        {
          name: 'gap',
          type: 'string',
          options: {
            list: [
              {title: 'large', value: 'l'},
              {title: 'medium', value: 'm'},
              {title: 'small', value: 's'},
            ]
          }
        }
      ]
    },
    {
      name: 'refType',
      type: 'string',
      options: {
        list: [
          {
            title: 'video',
            value: '_type == "video"'
          },
          {
            title: 'release',
            value: '_type == "release" && __i18n_lang == $lang'
          },
          {
            title: 'productVariant',
            value: '_type == "productVariant" && __i18n_lang == $lang'
          },
        ]
      }
    },
    {
      name: 'blocks',
      type: 'array',
      of: [
        {
          name: 'reference',
          title: 'Reference',
          type: 'reference',
          to: [
            {type: 'video'},
            {type: 'release'},
            {type: 'productVariant'},
          ],
          options: {
            filter: ({document}) => {
              let lang = document.__i18n_lang ?? 'de'
              if (!document.refType) {
                return {
                  filter: ''
                }
              }
              return {
                filter: document.refType,
                params: {
                  lang: lang
                }
              }
            }
          }
        },
        {
          name: 'internalCollection',
          type: 'internalCollection'
        }
      ],
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'page',
          type: 'reference',
          to: [
            {type: 'modular'},
          ]
        }
      ],
    }
  ],
}