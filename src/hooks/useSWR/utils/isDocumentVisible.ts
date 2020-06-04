export default function isDocumentVisible(): boolean {
  if (
    typeof document !== 'undefined' &&
    (typeof document.visibilityState !== 'undefined')
  ) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}
