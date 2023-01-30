export default {
  name: 'videoSection',
  title: 'Video Section',
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
      name: 'renderTitle',
      type: 'boolean'
    },
    {
      name: 'videos',
      type: 'array',
      of: [
        {
          name: 'video',
          type: 'reference',
          to: [{type: 'video'}]
        }
      ]
    },
    {
      name: 'cta',
      type: 'cta',
    },
  ],
}