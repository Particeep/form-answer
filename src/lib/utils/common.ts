export function getDateFormatSeparator(dateFormat: string): string {
  if (dateFormat.indexOf('/') >= 0) return '/';
  if (dateFormat.indexOf('-') >= 0) return '-';
  if (dateFormat.indexOf('.') >= 0) return '.';
  return '/';
}

export const stringToDate = (date: string, format: string): Date => {
  /**  @returns {string} '/' or '-' */
  const determineDelimiterFromFormat = (format: string) => format.indexOf('/') >= 0 ? '/' : '-';
  const delimiter = determineDelimiterFromFormat(format);

  let formatItems = format.toLowerCase().split(delimiter);
  let dateItems = date.split(delimiter);

  let monthIndex = formatItems.indexOf('mm');
  let dayIndex = formatItems.indexOf('dd');
  let yearIndex = formatItems.indexOf('yyyy');

  return new Date(Date.UTC(+dateItems[yearIndex], +dateItems[monthIndex] - 1, +dateItems[dayIndex]));
};

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export function urlify(text) {
  const getHostName = (url: string): string => new URL(url).hostname;
  if (text != undefined) {
    return text.replace(urlRegex, url => `<a href='${url}' class="Form_a" target='_blank'>${getHostName(url)}</a>`);
  }
};

export function extractUrlAnswer(answer: string[]) {
  if(!answer) return ""
  const url = answer.filter(a => a.match(urlRegex))
  return url && url.length > 0 ? url[0] : ""
}
