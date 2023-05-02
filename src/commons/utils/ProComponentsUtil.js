/**
 * this method is for helping to retrieve the nested object value
 * @param {*} object { a: { b: { c: 5 } } };
 * @param {*} keys ["a", "b", "c"];
 * @returns 5
 */
export const getValueFromObject = (object, keys) => {
  return keys.reduce((previous, current) => previous[current], object);
};
