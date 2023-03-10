export default {
  name: 'gallery',
  title: 'Gallery',
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
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}