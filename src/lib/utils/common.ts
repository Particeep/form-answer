export function getDateFormatSeparator(dateFormat: string): string {
  if (dateFormat.indexOf('/') >= 0) return '/';
  if (dateFormat.indexOf('-') >= 0) return '-';
  if (dateFormat.indexOf('.') >= 0) return '.';
  return '/';
}
