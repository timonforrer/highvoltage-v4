import { filterRefByLang } from "../../utils";

export default {
  name: 'global',
  title: 'Global',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      initialValue: 'Settings'
    },
    {
      name: 'nav',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          name: 'page',
          type: 'reference',
          to: [{type: 'modular'}],
          options: {filter: filterRefByLang}
        },
      ],
    },
  ],
}