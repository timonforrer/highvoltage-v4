export default {
  name: 'release',
  title: 'Release',
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
      name: 'type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Album',
            value: 'album'
          },
          {
            title: 'EP',
            value: 'ep'
          },
          {
            title: 'Single',
            value: 'single'
          }
        ]
      }
    },
    {
      name: 'providers',
      title: 'Providers',
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
    {
      name: 'tracks',
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
              }
            }
          ],
        },
      ],
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          name: 'video',
          title: 'Video',
          type: 'object',
          fields: [
            {
              name: 'title',
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
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}