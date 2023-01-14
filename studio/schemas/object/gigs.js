export default {
  name: 'gigs',
  title: 'Gigs',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'filter',
      title: 'Filter',
      type: 'string',
      options: {
        list: [
          {
            title: 'Upcoming',
            value: 'upcoming'
          },
          {
            title: 'Past',
            value: 'past'
          },
        ]
      }
    }
  ],
}