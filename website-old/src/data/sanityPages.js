const fetchFromSanity = require("../utils/fetchFromSanity");

module.exports = async function() {
  let query = `
    *[_type == "modular"]{
      _type == "modular" => {
        ...,
        blocks[] {
          ...,
          _type in [
            "videoHero",
            "section",
            "productCategory"
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
                },
                _type == "internalCollection" => @,
              },
            },
          },
        },
      },
    }
  `;

  let data = await fetchFromSanity({
    query: query,
    identifier: '_id'
  });

  return data;
}
