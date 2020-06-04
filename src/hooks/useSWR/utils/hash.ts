const table = new WeakMap();

let counter = 0;

export default function hash(args: any[]): string {
  if (args.length === 0) return '';
  let key = 'arg';
  for(let i=0,len=args.length; i<len; i++) {
    const item = args[i];
    let _hash: string|number = '';
    if (item === null || (typeof item !== 'object')) {
      if (typeof item === 'string') {
        _hash = `"${item}"`;
      } else {
        _hash = String(item);
      }
    } else {
      if (!table.has(item)) {
        _hash = counter;
        table.set(item, counter++);
      } else {
        _hash = table.get(item);
      }
    }
    key += `@${_hash}`;
  }
  return key;
}
