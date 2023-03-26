const translations = {
  play: {
    de: 'Video abspielen',
    en: 'play Video'
  },
  learnMore: {
    de: 'mehr erfahren',
    en: 'learn more'
  },
  nextImage: {
    de: 'nächstes Bild',
    en: 'next image',
  },
  previousImage: {
    de: 'vorheriges Bild',
    en: 'previous image',
  },
  backToImageOverview: {
    de: 'zurück zur Bildübersicht',
    en: 'back to image overview',
  },
  showImage: {
    de: 'Bild ansehen',
    en: 'show Image',
  },
  submit: {
    de: 'absenden',
    en: 'submit'
  }
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
