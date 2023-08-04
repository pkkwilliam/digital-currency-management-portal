export function getNullableData(value, valueIfNull = '-') {
  return value ? value : valueIfNull;
}
