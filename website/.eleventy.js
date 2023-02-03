require('dotenv').config();

// const { EleventyServerlessBundlerPlugin, EleventyRenderPlugin } = require('@11ty/eleventy');
const WebC = require('@11ty/eleventy-plugin-webc');
// const getLangs = require('./src/utils/getLangs');
// const portableTextToHTML = require('./src/utils/portableTextToHTML');
const sass = require('sass');
const path = require('path');

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} config 
 */

module.exports = function(config) {

  // config.addPlugin(EleventyServerlessBundlerPlugin, {
  //   name: 'preview',
  //   functionsDir: './netlify/functions',
  //   copy: ['src/utils']
  // });

  config.addPlugin(WebC, {
    components: 'src/components/*.webc'
  });

  config.addJavaScriptFunction('dump', function(input) {
    return JSON.stringify(input, null, 2);
  });
  config.addJavaScriptFunction('encode', function(input) {
    return JSON.stringify(encodeURIComponent(input));
  });
  config.addJavaScriptFunction('decode', function(input) {
    return JSON.parse(decodeURIComponent(input))
  })

  // config.addJavaScriptFunction('getLangs', getLangs);
  // config.addJavaScriptFunction('portableTextToHTML', portableTextToHTML);

  config.addTemplateFormats('scss');
  config.addExtension('scss', {
    outputFileExtension: 'css',
    compile: async function(input, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      let result = sass.compileString(input);
      return async (data) => result.css;
    }
  })

  return {
    dir: {
      data: 'data',
      includes: 'components',
      input: 'src',
      layouts: 'layouts',
      output: 'dist'
    }
  }
}
