export function isNumber(value) {
  return value !== undefined && typeof value === "number" && isFinite(value);
}

export function isNonNegative(value) {
  return isNumber(value) && value >= 0;
}

export function isPositive(value) {
  return isNumber(value) && value > 0;
}

export function randomInt(max, min = 0) {
  if (!isNonNegative(max)) throw new Error();
  if (!isNonNegative(min) || min > max) throw new Error();
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function numberWithCommas(number, i18n) {
  number = typeof number !== String && "" + number;
  const result = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return i18n?.language && i18n.language === "pt"
    ? result.replace(/,/g, ".")
    : result;
}
