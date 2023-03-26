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
        {
          name: 'richtext',
          title: 'Richtext',
          type: 'arrayRichtext'
        },
        {
          name: 'form',
          title: 'Form',
          type: 'reference',
          to: [{type: 'form'}],
          options: {filter: filterRefByLang}
        },
        {
          name: 'videoHero',
          title: 'Video Hero',
          type: 'reference',
          to: [{type: 'videoHero'}],
          options: {filter: filterRefByLang}
        },
        {
          name: 'section',
          title: 'Section',
          type: 'reference',
          to: [{type: 'section'}],
          options: {filter: filterRefByLang}
        },
        {
          name: 'internalCollection',
          type: 'internalCollection'
        },
        {
          name: 'productCategory',
          title: 'Product Category',
          type: 'reference',
          to: [{type: 'productCategory'}],
          options: {filter: filterRefByLang}
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