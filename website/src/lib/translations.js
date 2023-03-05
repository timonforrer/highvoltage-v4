const translations = {
  play: {
    de: 'Video abspielen',
    en: 'play Video'
  },
  learnMore: {
    de: 'mehr erfahren',
    en: 'learn more'
  },
}

export function t(key, lang, transform) {
  let translation = translations[key][lang];
  switch (transform) {
    case 'capitalize':
      translation = translation.charAt(0).toUpperCase() + translation.slice(1);
      return translation;
    default:
      return translation;
  }
}
