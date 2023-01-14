export default {
  name: 'gig',
  title: 'Gig',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'meta',
      type: 'meta'
    }
  ],
  preview: {
    select: {
      title: 'meta.title' || ''
    }
  }
}