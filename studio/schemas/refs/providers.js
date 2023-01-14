export default {
  name: 'providers',
  title: 'Providers',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'provider',
          title: 'Provider',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ],
        },
      ],
    },
  ],
}