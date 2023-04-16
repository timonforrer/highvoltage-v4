import { filterRefByLang } from "../../utils";

export default {
  name: 'milestone',
  title: 'Milestone',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'date',
      type: 'date'
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'richtext'
    },
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {
          name: 'page',
          type: 'reference',
          to: [
            {type: 'modular'},
            {type: 'release'},
            {type: 'gallery'},
          ],
          options: {
            filter: (input) => filterRefByLang(input),
          },
        },
        {
          name: 'backlink',
          type: 'boolean',
          initialValue: false,
          description: 'If active, a backlink will be displayed on the linked page. Recommended for gallery pages.',
        }
      ],
    },
  ],
}