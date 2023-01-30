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
      name: 'highlighted',
      type: 'object',
      fields: [
        {
          name: 'youtubeMusic',
          title: 'YouTube Music',
          type: 'url'
        },
        {
          name: 'spotify',
          type: 'url'
        },
        {
          name: 'appleMusic',
          title: 'Apple Music',
          type: 'url'
        }
      ],
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