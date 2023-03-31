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
  },
  tracks: {
    de: 'Songs',
    en: 'tracks'
  },
  releaseDate: {
    de: 'veröffentlicht',
    en: 'release date'
  },
  availableAt: {
    de: 'verfügbar auf',
    en: 'available at'
  },
  videos: {
    de: 'videos',
    en: 'videos'
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
