import YoutubeEmbed from "../../components/YoutubeEmbed";

export default {
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
  preview: {
    select: {
      url: 'url',
      title: 'title'
    }
  },
  components: {
    preview: YoutubeEmbed,
  }
}