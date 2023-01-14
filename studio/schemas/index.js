import gig from "./documents/gig";
import modular from "./documents/modular";
import release from "./documents/release";
import gigs from "./object/gigs";
import meta from "./object/meta";

export const schemaTypes = [
  // objects
  gigs,
  meta,
  // documents
  gig,
  modular,
  release
]
