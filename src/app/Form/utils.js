import {questionType} from "./Question/Question";


export function isFunction(f) {
    return f && typeof f === 'function';
}

export function getDateFormatSeparator(dateFormat) {
    if (dateFormat.indexOf('/') >= 0) return '/';
    if (dateFormat.indexOf('-') >= 0) return '-';
    if (dateFormat.indexOf('.') >= 0) return '/';
    return '/';
}

export function isDependable(question) {
    return question.question_type === questionType.SELECT
        || question.question_type === questionType.RADIO;
}