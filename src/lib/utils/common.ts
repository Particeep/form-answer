export function isFunction(f) {
    return f && typeof f === 'function';
}

export function getDateFormatSeparator(dateFormat: string): string {
    if (dateFormat.indexOf('/') >= 0) return '/';
    if (dateFormat.indexOf('-') >= 0) return '-';
    if (dateFormat.indexOf('.') >= 0) return '.';
    return '/';
}