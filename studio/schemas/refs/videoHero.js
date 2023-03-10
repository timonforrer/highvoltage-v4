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
      title: 'Video',
      name: 'muxvideo',
      type: 'mux.video'
    },
  ],
}