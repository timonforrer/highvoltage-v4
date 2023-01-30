// import { filterRefByLang } from "../../utils";

export default {
  name: 'releaseSection',
  title: 'Release Section',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'description',
      type: 'richtext'
    },
    {
      name: 'refTypes',
      type: 'string',
      options: {
        list: [
          {title: 'Release', value: 'release'}
        ]
      }
    },
    {
      name: 'release',
      type: 'reference',
      to: [
        {type: 'release'},
        {type: 'video'}
      ],
      options: {filter: ({document}) => {
        if (!document.refTypes) {
          return {
            filter: ''
          }
        }
        return {
          filter: '_type == $type',
          params: {type: document.refTypes}
        }
      }}
    },
    {
      name: 'cta',
      type: 'cta'
    }
  ],
}