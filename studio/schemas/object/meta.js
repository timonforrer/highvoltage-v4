import { filterRefByLang } from "../../utils"

export default {
  name: 'meta',
  title: 'Meta Data',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: Rule => Rule.max(155)
    },
    {
      name: 'socialMediaMetadata',
      title: 'Social Media Metadata',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          title: 'Description',
          name: 'description',
          type: 'text',
          validation: Rule => Rule.max(155)
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'parentPage',
      title: 'Parent page',
      type: 'reference',
      to: [{ type: 'modular' }],
      options: {
        filter: (input) => filterRefByLang(input)
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'meta.title',
        slugify: input => input
                          .toLowerCase()
                          .replace(/\s+/g, '-')
      }
    },
    {
      name: 'publishedDate',
      title: 'First Published Date',
      type: 'datetime'
    },
    {
      name: 'revisionDate',
      title: 'Last (major) Revision Date',
      type: 'datetime'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    }
  ],
  options: {
    collapsible: true,
    collapsed: true
  }
}
