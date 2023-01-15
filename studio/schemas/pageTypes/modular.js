import { filterRefByLang } from "../../utils";

export default {
  name: 'modular',
  title: 'Modular',
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
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {type: 'gigs'},
        {
          name: 'richtext',
          title: 'Richtext',
          type: 'arrayRichtext'
        },
        {
          name: 'release',
          title: 'Release',
          type: 'reference',
          to: [{type: 'release'}],
          options: {filter: filterRefByLang}
        },
        {
          name: 'productCategory',
          title: 'Product Category',
          type: 'reference',
          to: [{type: 'productCategory'}],
          options: {filter: filterRefByLang}
        }
      ],
    },
  ],
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}