import {questionType} from "./Question/Question";
import moment from "moment";

export function mapSingleAnswer(answers) {
    return (answers && answers[0]) || '';
}

export function parseSingleAnswer(answer) {
    if (answer || answer === '') return [answer];
    return undefined;
}

export function dateToApiFormat(string, format) {
    const date = moment(string, format.toUpperCase(), true);
    if (date.isValid())
        return date.toDate().toISOString().split('.')[0] + 'Z';
}

export function apiFormatToDate(date, format) {
    return moment(date).format(format.toUpperCase());
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