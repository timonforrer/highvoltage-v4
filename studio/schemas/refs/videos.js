export default {
  name: 'videos',
  title: 'Videos',
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
          name: 'video',
          type: 'reference',
          to: [{type: 'video'}]
        }
      ],
    }
  ],
}
