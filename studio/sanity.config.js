import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {withDocumentI18nPlugin} from '@sanity/document-internationalization'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {structure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Voltage Arc',

  projectId: '0j5eyb7h',
  dataset: 'production',

  plugins: withDocumentI18nPlugin((pluginConfig) => ([
    deskTool({
      structure,
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
