export const replacer = ({string, data}) => string.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
  return typeof data[key] !== 'undefined' ? data[key] : match;
});