export default {
  name: 'tracks',
  title: 'Tracks',
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
          name: 'track',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string'
            },
            {
              name: 'file',
              type: 'file',
              options: {
                storeOriginalFilename: false,
                accept: 'audio/*'
              },
            }
          ],
        },
      ],
    },
  ],
}