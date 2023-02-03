module.exports = {
  dynamicPermalink: false,
  eleventyComputed: {
    lang: data => data.current_page.__i18n_lang,
    title: data => data.current_page.meta.title,
    permalink: data => `${data.current_page.meta.slug.current}/index.html`,
  },
  layout: 'base.webc',
  pagination: {
    alias: 'current_page',
    data: 'sanityPages',
    resolve: 'values',
    size: 1,
  },
  permalink: ' '
}
