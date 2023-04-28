export default {
  name: 'internalCollection',
  title: 'Internal Collection',
  type: 'object',
  fields: [
    {
      name: 'collectionName',
      type: 'string',
      options: {
        list: [
          {title: 'All Videos', value: 'allVideos'},
          {title: 'All Gigs', value: 'allGigs'},
          {title: 'All Releases', value: 'allReleases'},
          {title: 'Cart Items', value: 'cartItems'},
        ],
      },
    },
    {
      name: 'filterGigs',
      type: 'string',
      hidden: ({parent}) => parent?.collectionName !== 'allGigs',
      options: {
        list: ['upcoming', 'past'],
      },
    },
    {
      name: 'limitGigs',
      type: 'number',
      hidden: ({parent}) => parent?.collectionName !== 'allGigs',
      validation: Rule => Rule.min(0).integer(),
    },
  ],
}
