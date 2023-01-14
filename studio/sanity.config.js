import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {withDocumentI18nPlugin, getDocumentList} from '@sanity/document-internationalization'
import {media, mediaAssetSource} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'highvoltage-v4',

  projectId: '0j5eyb7h',
  dataset: 'production',

  plugins: withDocumentI18nPlugin((pluginConfig) => ([
    deskTool({
      structure: (S, {schema}) => getDocumentList({S, schema, config: pluginConfig}),
    }),
    visionTool(),
    media({
      originalFilename: false
    }),
  ]), {
    includeDeskTool: false,
    languages: [
      {
        "id": "de",
        "title": "Deutsch"
      },
      {
        "id": "en",
        "title": "English"
      }
    ],
    idStructure: "subpath"
  }),

  form: {
    file: {
      assetSources: () => [mediaAssetSource],
      originalFilename: false,
      directUploads: true
    },
    image: {
      assetSources: () => [mediaAssetSource],
      originalFilename: false,
      directUploads: true
    }
  },

  schema: {
    types: schemaTypes,
  },
})
