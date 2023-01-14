import { toPlainText } from "@portabletext/react"

export default {
  name: 'arrayRichtext',
  title: 'Array richtext',
  type: 'object',
  fields: [
    {
      name: 'content',
      type: 'richtext',
    }
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare(selection) {
      const { content } = selection;
      return {
        title: 'Richtext',
        subtitle: toPlainText(content)
      }
    },
  }
}