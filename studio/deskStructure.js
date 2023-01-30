import {FiBox, FiCalendar, FiCopy, FiDatabase, FiLayout, FiLink2, FiMusic, FiShoppingBag, FiTag} from 'react-icons/fi'

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
        )
        .icon(FiLayout),
      S.listItem()
        .title('Releases')
        .child(
          S.documentList()
            .title('Releases')
            .filter('_type == "release" && __i18n_lang == "de"')
        )
        .icon(FiMusic),
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
            .defaultOrdering([{field: 'internal.startDate', direction: 'desc'}])
        )
        .icon(FiCalendar),
      S.listItem()
        .title('Shop')
        .child(
          S.list()
            .title('Shop')
            .items([
              S.listItem()
                .title('Variant Controllers')
                .child(
                  S.documentList()
                    .title('Variant Controllers')
                    .filter('_type == "productVariant" && __i18n_lang == "de"')
                  )
                  .icon(FiCopy),
              S.listItem()
                .title('SKUs')
                .child(
                  S.documentList()
                    .title('SKUs')
                    .filter('_type == "productSku" && __i18n_lang == "de"')
                )
                .icon(FiBox),
              S.listItem()
                .title('Categories')
                .child(
                  S.documentList()
                    .title('Categories')
                    .filter('_type == "productCategory" && __i18n_lang == "de"')
                )
                .icon(FiTag)
            ])
            .menuItems([
              S.menuItem()
                .title('Pull data from Airtable')
                .icon(FiDatabase)
                .action(() => {
                  // would be neat, if we could output a success/error message
                  // but couldn't get toast working
                  fetch('https://highvoltage-v4.vercel.app/api/populate-shop')
                })
            ])
        )
        .icon(FiShoppingBag),
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
                .title('Video')
                .child(
                  S.documentList()
                    .title('Video')
                    .filter('_type == "video"')
                ),
              S.listItem()
                .title('Video Hero')
                .child(
                  S.documentList()
                    .title('Video Hero')
                    .filter('_type == "videoHero" && __i18n_lang == "de"')
                ),
              S.listItem()
                .title('Videos')
                .child(
                  S.documentList()
                    .title('Videos')
                    .filter('_type == "videos"')
                ),
              S.listItem()
                .title('Video Section')
                .child(
                  S.documentList()
                    .title('Video Section')
                    .filter('_type == "videoSection" && __i18n_lang == "de"')
                ),
            ])
        )
        .icon(FiLink2)
    ])