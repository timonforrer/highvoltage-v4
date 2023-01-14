import { filterRefByLang } from "../../utils";

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
      name: 'artwork',
      type: 'image'
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
      name: 'releaseDate',
      type: 'date'
    },
    {
      name: 'providers',
      type: 'reference',
      to: [{type: 'providers'}]
    },
    {
      name: 'tracks',
      type: 'reference',
      to: [{type: 'tracks'}],
    },
    {
      name: 'videos',
      type: 'reference',
      to: [{type: 'videos'}]
    },
    {
      name: 'reviews',
      type: 'reference',
      to: [{type: 'reviews'}],
      options: {filter: filterRefByLang}
    },
    {
      name: 'body',
      type: 'richtext'
    }
  ],
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}