import YoutubeEmbed from "../../components/YoutubeEmbed";

export default {
  name: 'inlinevideo',
  title: 'Inline Video',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    }
  ],
  preview: {
    select: {
      url: 'url'
    }
  },
  components: {
    preview: YoutubeEmbed
  }
}