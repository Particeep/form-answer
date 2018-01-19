import moment from "moment";

export class ApiParser {

    methods = {
        TEXT: {
            fromApi: value => this.mapSingleAnswer(value),
            toApi: value => this.parseSingleAnswer(value)
        },
        LONGTEXT: {
            fromApi: value => this.mapSingleAnswer(value),
            toApi: value => this.parseSingleAnswer(value)
        },
        DATE: {
            fromApi: value => this.fromApiDate(this.mapSingleAnswer(value)),
            toApi: value => this.parseSingleAnswer(this.toApiDate(value))
        },
        RADIO: {
            fromApi: value => this.mapSingleAnswer(value),
            toApi: value => this.parseSingleAnswer(value)
        },
        SELECT: {},
        CHECKBOX: {
            fromApi: value => value || [],
            toApi: value => value.length === 0 ? null : value
        },
        DOCUMENT: {},
        LABEL: {},
    };

    constructor(dateFormat) {
        this.dateFormat = dateFormat;
    }

    fromApi(questionType) {
        return this.methods[questionType].fromApi;
    }

    toApi(questionType) {
        return this.methods[questionType].toApi;
    }

    mapSingleAnswer(answers) {
        return (answers && answers[0]) || '';
    }

    parseSingleAnswer(answer) {
        if (answer || answer === '') return [answer];
        return undefined;
    }

    toApiDate(string) {
        const date = moment(string, this.dateFormat.toUpperCase(), true);
        if (date.isValid()) return date.toDate().toISOString().split('.')[0] + 'Z';
    }

    fromApiDate(date) {
        if (date) return moment(date).format(this.dateFormat.toUpperCase());
        return '';
    }
}