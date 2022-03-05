export const randomInt = function(max, min = 0) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

export function numberWithCommas(x) {
    x = typeof x !== String && '' + x
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numberWithCommasIntl = (i18n, n) => {
  const result = numberWithCommas(n);
  return i18n.language === "pt" ? result.replace(/,/g, ".") : result;
};