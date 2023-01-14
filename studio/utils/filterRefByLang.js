export function filterRefByLang(input) {
  const { document } = input;
  if (!document.__i18n_lang) {
    return {
      filter: '__i18n_lang == $lang',
      params: { lang: 'de' }
    }
  }

  return {
    filter: '__i18n_lang == $lang',
    params: { lang: document.__i18n_lang }
  }
}