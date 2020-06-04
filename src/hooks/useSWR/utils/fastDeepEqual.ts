const isArray = Array.isArray;
const keys = Object.keys;
const hasOwn = Object.prototype.hasOwnProperty;

function equal(a: any, b: any): boolean {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    let isA, isB, index, length;

    // 数组类型
    isA = isArray(a);
    isB = isArray(b);
    if (isA !== isB) return false;
    if (isA && isB) {
      length = a.length;
      if (length !== b.length) return false;
      for (index = 0; index < length; index++) if (!equal(a[index], b[index])) return false;
      return true;
    }
    // 日期类型
    isA = a instanceof Date;
    isB = a instanceof Date;
    if (isA !== isB) return false;
    if (isA && isB) {
      return a.getTime() === b.getTime();
    }
    // 正则类型
    isA = a instanceof RegExp;
    isB = a instanceof RegExp;
    if (isA !== isB) return false;
    if (isA === isB) {
      return a.toString() === b.toString();
    }
    const keysA = keys(a);
    const keysB = keys(b);
    length = keysA.length;
    if (length !== keysB.length) return false;
    for (index = 0; index < length; index++) if (!hasOwn.call(b, keysA[index])) return false;
    for (index = 0; index < length; index++)
      if (!equal(a[keysA[index]], b[keysA[index]])) return false;
    return true;
  }
  return a !== a && b !== b; // NaN
}

export default equal;
