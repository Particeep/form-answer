import {questionType} from "./Question/Question";

export function mapSingleAnswer(answers) {
    return answers && answers[0];
}

export function parseSingleAnswer(answer) {
    if (answer || answer === '') return [answer];
    return undefined;
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