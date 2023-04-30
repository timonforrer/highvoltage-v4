import { filterRefByLang } from "../../utils"

export default {
  name: 'form',
  title: 'Form',
  type: 'document',
  i18n: true,
  initialValue: {
    __i18n_lang: 'de',
  },
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'inputs',
      type: 'array',
      of: [
        {
          name: 'textInput',
          title: 'Text Input',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string',
            },
            {
              name: 'label',
              type: 'string',
            },
            {
              name: 'type',
              type: 'string',
              options: {
                list: [
                  {title: 'Normal Text', value: 'text'},
                  {title: 'E-Mail', value: 'email'},
                ]
              }
            }
          ],
        },
        {
          name: 'numberInput',
          title: 'Number Input',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string'
            },
            {
              name: 'label',
              type: 'string'
            },
          ],
        },
        {
          name: 'radioInput',
          title: 'Radio Input',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string'
            },
            {
              name: 'label',
              type: 'string'
            },
            {
              name: 'options',
              type: 'array',
              of: [
                {
                  name: 'option',
                  type: 'object',
                  fields: [
                    {
                      name: 'id',
                      title: 'ID',
                      type: 'string'
                    },
                    {
                      name: 'value',
                      type: 'string'
                    },
                    {
                      name: 'label',
                      type: 'string'
                    }
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'selectInput',
          title: 'Select Input',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string'
            },
            {
              name: 'label',
              type: 'string'
            },
            {
              name: 'options',
              type: 'array',
              of: [
                {
                  name: 'option',
                  type: 'object',
                  fields: [
                    {
                      name: 'value',
                      type: 'string'
                    },
                    {
                      name: 'label',
                      type: 'string'
                    }
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'textarea',
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string'
            },
            {
              name: 'label',
              type: 'string',
            }
          ],
        },
      ],
    },
    {
      name: 'internalEmail',
      title: 'Internal E-Mail',
      type: 'object',
      fields: [
        {
          name: 'subject',
          type: 'string'
        },
        {
          name: 'sender',
          type: 'string'
        },
        {
          name: 'body',
          type: 'richtext'
        }
      ],
    },
    {
      name: 'externalEmail',
      title: 'External E-Mail',
      type: 'object',
      fields: [
        {
          name: 'subject',
          type: 'string'
        },
        {
          name: 'recipient',
          type: 'string'
        },
        {
          name: 'body',
          type: 'richtext'
        }
      ],
    },
    {
      name: 'successPage',
      type: 'reference',
      to: [{ type: 'modular' }],
      options: {filter: filterRefByLang}
    },
    {
      name: 'apiEndpoint',
      title: 'API Endpoint',
      type: 'string',
    }
  ],
}
