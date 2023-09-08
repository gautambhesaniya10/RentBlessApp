export function arraysHaveSameValues(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false; // Arrays have different lengths, so they can't have the same values.
  }
  const set2 = new Set(arr2);

  // Check if the sets have the same size and all elements in set1 are in set2
  return arr1.length === arr2.length && arr1.every(value => set2.has(value));
}
