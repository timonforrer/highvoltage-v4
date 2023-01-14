export default {
  name: 'richtext',
  title: 'Richtext',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ]
      }
    },
    {
      name: 'inlinevideo',
      title: 'Inline Video',
      type: 'inlinevideo'
    }
  ]
}
