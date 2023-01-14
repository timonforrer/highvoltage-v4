export default {
  name: 'reviews',
  title: 'Reviews',
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
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'review',
          type: 'object',
          fields: [
            {
              name: 'reviewer',
              description: 'Who wrote the review? (e.g. magazine name)',
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            },
            {
              name: 'image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'alt',
                  type: 'string',
                  options: {
                    // isHighlighted: true
                  }
                }
              ]
            }
          ],
        },
      ],
    },
  ],
}