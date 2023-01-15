import providers from "./refs/providers";
import reviews from "./refs/reviews";
import tracks from "./refs/tracks";
import videos from "./refs/videos";
import arrayRichtext from "./object/arrayRichtext";
import gigs from "./object/gigs";
import inlinevideo from "./object/inlinevideo";
import meta from "./object/meta";
import richtext from "./object/richtext";
import video from "./object/video";
import gig from "./pageTypes/gig";
import modular from "./pageTypes/modular";
import release from "./pageTypes/release";
import productCategory from "./pageTypes/productCategory";
import productSku from "./pageTypes/productSku";
import productVariant from "./pageTypes/productVariant";

export const schemaTypes = [
  // objects
  arrayRichtext,
  gigs,
  inlinevideo,
  meta,
  richtext,
  video,
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
  tracks,
  videos,
]
