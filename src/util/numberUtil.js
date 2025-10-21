export function money(value, decimal = 2, showSign = true, defaultValue = '-') {
  let result;
  if (!value || value === 0) {
    result = defaultValue;
  } else {
    result = value.toFixed(decimal);
  }
  return showSign ? `$${result}` : result;
}

export function findMaxDecimalPoint(numbers) {
  let longestDecimalNumber = '0';
  if (Array.isArray(numbers)) {
    longestDecimalNumber = numbers
      .map((number) => number.toString())
      .sort((n1, n2) => (n1.length > n2.length ? -1 : 1))[0];
  } else if (typeof numbers === 'number') {
    longestDecimalNumber = numbers.toString();
  } else {
    longestDecimalNumber = numbers;
  }
  const split = longestDecimalNumber.split('.');
  return split.length > 1 ? split[1].length : 0;
}
