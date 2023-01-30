import arrayRichtext from "./object/arrayRichtext";
import gigs from "./object/gigs";
import inlinevideo from "./object/inlinevideo";
import internalCollection from "./object/internalCollection";
import meta from "./object/meta";
import richtext from "./object/richtext";

import gig from "./pageTypes/gig";
import modular from "./pageTypes/modular";
import release from "./pageTypes/release";
import productCategory from "./pageTypes/productCategory";
import productSku from "./pageTypes/productSku";
import productVariant from "./pageTypes/productVariant";

import providers from "./refs/providers";
import reviews from "./refs/reviews";
import section from "./refs/section";
import tracks from "./refs/tracks";
import video from "./refs/video";
import videoHero from "./refs/videoHero";
import videos from "./refs/videos";

export const schemaTypes = [
  // objects
  arrayRichtext,
  gigs,
  inlinevideo,
  internalCollection,
  meta,
  richtext,
  // page types
  gig,
  modular,
  productCategory,
  productSku,
  productVariant,
  release,
  // refs
  providers,
  reviews,
  section,
  tracks,
  video,
  videoHero,
  videos,
]
