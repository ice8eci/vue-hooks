export default function throttle(
  fn: (...args: any[]) => any,
  interval: number
):(...args: any[]) => any {
  let pending = false;
  return function(...args: any[]): any {
    if (pending) return;
    pending = true;
    fn(...args);
    setTimeout(() => pending = false, interval);
  }
}
