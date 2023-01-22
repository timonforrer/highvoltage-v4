export function removeDuplicates({array, key}) {
  return array.filter((item, index, self) => (
    index === self.findIndex((t) => (
      t[key] === item[key]
    ))
  ))
};
