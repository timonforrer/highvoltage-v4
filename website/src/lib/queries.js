export const modularPages = `
*[_type == "modular"]{
  ...,
  blocks[] {
    ...,
    _type in [
      "videoHero",
      "section",
      "productCategory",
      "gallery"
    ] => @-> {
      _type == "gallery" => {
        ...,
        images[] {
          ...,
          credits->,
          image {
            ...,
            asset->,
          },
        },
      },
      _type == "videoHero" => {
        ...,
        backgroundImage{
          ...,
          asset->,
        },
        backgroundVideo{
          ...,
          asset->,
        },
        muxvideo{
          ...,
          asset->
        }
      },
      _type == "section" => {
        ...,
        cta {
          title,
          "slug": page->meta.slug.current,
        },
        blocks[]{
          _type == "reference" => @->{
            ...,
            _type == "release" => {
              artwork {
                ...,
                asset->,
              },
              providers->,
              tracks->{
                ...,
                items[] {
                  ...,
                  file {
                    ...,
                    asset->,
                  },
                },
              },
            },
            _type == "milestone" => {
              ...,
              image {
                ...,
                asset->,
              },
              cta {
                title,
                "slug": page->meta.slug.current,
              },
            },
            _type == "productVariant" => {
              ...,
              mainImage {
                ...,
                asset->
              },
              productSkus[]->,
            }
          },
          _type == "internalCollection" => @,
        },
      },
      _type == "productCategory" => @
    },
  },
}
`;

export const upcomingGigs = `
*[_type == "gig" && internal.startDate >= now()] | order(internal.startDate asc)`;
export const pastGigs = `
*[_type == "gig" && internal.startDate < now()] | order(internal.startDate desc)`;

export const allReleases = `
*[_type == 'release' && __i18n_lang == $lang]|order(releaseDate desc){
  ...,
  artwork {
    ...,
    asset->
  },
  providers->,
  tracks->,
  videos->,
}`;

export const globalSettings = `
*[_type=="global" && __i18n_lang == $lang]{
  ...,
  nav[]->
}[0]`;

export const productSkus = `
*[_type=="productSku"]{
  ...,
  blocks[] {
    ...,
    _type == "reviews" => @-> {
      ...,
      items[] {
        ...,
        image {
          asset->
        }
      }
    }
  },
  mainImage {
    ...,
    asset->
  },
  supplementaryImages[] {
    ...,
    asset->
  }
}`;

export const productVariantControllers = `
*[_type=="productVariant" && productCategory._ref match $id]{
  ...,
  blocks[] {
    ...,
    _type == "reviews" => @-> {
      ...,
      items[] {
        ...,
        image {
          asset->
        }
      }
    }
  },
  mainImage {
    ...,
    asset->
  },
  productCategory->,
  productSkus[]->{
    meta,
    sku,
    variant
  },
  supplementaryImages[] {
    ...,
    asset->
  }
}`;
