export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    {
      name: 'images',
      type: 'array',
      of: [
        {
          name: 'imageBlock',
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'credits',
              type: 'reference',
              to: [{type: 'credits'}]
            },
            {
              name: 'caption',
              type: 'string'
            }
          ],
        },
      ],
    },
  ],
}