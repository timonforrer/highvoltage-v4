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
          type: 'reference',
          title: 'Release',
          to: [{type: 'release'}],
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