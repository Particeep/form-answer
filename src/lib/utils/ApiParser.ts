import * as Moment from 'moment';

export class ApiParser {

    private dateFormat;

    methods = {
        TEXT: {
            fromApi: x => this.mapSingleAnswer(x),
            toApi: x => this.parseSingleAnswer(x)
        },
        LONGTEXT: {
            fromApi: x => this.mapSingleAnswer(x),
            toApi: x => this.parseSingleAnswer(x)
        },
        DATE: {
            fromApi: x => this.dateFormat ? this.fromApiDate(this.mapSingleAnswer(x)) : this.mapSingleAnswer(x),
            toApi: x => this.dateFormat ? this.parseSingleAnswer(this.toApiDate(x)) : this.parseSingleAnswer(x)
        },
        RADIO: {
            fromApi: x => this.mapSingleAnswer(x),
            toApi: x => this.parseSingleAnswer(x)
        },
        SELECT: {
            fromApi: x => this.mapSingleAnswer(x),
            toApi: x => this.parseSingleAnswer(x)
        },
        CHECKBOX: {
            fromApi: x => x || [],
            toApi: x => x.length === 0 ? null : x
        },
        DOCUMENT: {
            fromApi: x => x || [],
            toApi: x => x.length === 0 ? null : x
        },
        LABEL: {
            fromApi: x => null,
            toApi: x => null
        },
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

    private mapSingleAnswer(answers: string[]) {
        return (answers && answers[0]) || '';
    }

    private parseSingleAnswer(answer: string) {
        if (answer || answer === '') return [answer];
        return null;
    }

    private toApiDate(string: string) {
        const date = Moment(string, this.dateFormat.toUpperCase(), true);
        if (date.isValid()) return date.toDate().toISOString().split('.')[0] + 'Z';
    }

    private fromApiDate(date: string) {
        if (date) return Moment(date).format(this.dateFormat.toUpperCase());
        return '';
    }
}