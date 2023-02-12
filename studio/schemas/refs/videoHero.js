export default {
  name: 'videoHero',
  title: 'Video Hero',
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
      name: 'description',
      type: 'richtext'
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'string'
    },
    {
      name: 'video',
      type: 'video'
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    }
  ],
}