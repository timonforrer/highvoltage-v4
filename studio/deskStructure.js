import {FiDatabase} from 'react-icons/fi'

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Modular Pages')
        .child(
          S.documentList()
            .title('Modular Pages')
            .filter('_type == "modular" && __i18n_lang == "de"')
        ),
      S.listItem()
        .title('Releases')
        .child(
          S.documentList()
            .title('Releases')
            .filter('_type == "release" && __i18n_lang == "de"')
        ),
      S.listItem()
        .title('Gigs')
        .child(
          S.documentList()
            .title('Gigs')
            .filter('_type == "gig" && __i18n_lang == "de"')
            .menuItems([
              S.menuItem()
                .title('Pull data from Airtable')
                .icon(FiDatabase)
                .action(() => {
                  // would be neat, if we could output a success/error message
                  // but couldn't get toast working
                  fetch('https://highvoltage-v4.vercel.app/api/populate-gigs')
                })
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Reference Types')
        .child(
          S.list()
            .title('Reference Types')
            .items([
              S.listItem()
                .title('Providers')
                .child(
                  S.documentList()
                    .title('Providers')
                    .filter('_type == "providers"')
                ),
              S.listItem()
                .title('Reviews')
                .child(
                  S.documentList()
                    .title('Reviews')
                    .filter('_type == "reviews" && __i18n_lang == "de"')
                ),
              S.listItem()
                .title('Tracks')
                .child(
                  S.documentList()
                    .title('Tracks')
                    .filter('_type == "tracks"')
                ),
              S.listItem()
                .title('Videos')
                .child(
                  S.documentList()
                    .title('Videos')
                    .filter('_type == "videos"')
                )
            ])
        )
    ])