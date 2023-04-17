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
  goBack: {
    de: 'gehe zurück',
    en: 'go back'
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
  },
  photoBy: {
    de: 'Foto von',
    en: 'Photo by'
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
