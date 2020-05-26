export function getNumberValuefromStyle(styleValue:string): number {
  const numberString = styleValue.substring(0, styleValue.length - 2);
  return Number(numberString) || 0;
}
