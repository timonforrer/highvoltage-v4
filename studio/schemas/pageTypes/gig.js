export default {
  name: 'gig',
  title: 'Gig',
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
      name: 'internal',
      type: 'object',
      options: {
        collapsable: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'airtableId',
          title: 'Airtable ID',
          type: 'string'
        },
        {
          name: 'startDate',
          type: 'date'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}