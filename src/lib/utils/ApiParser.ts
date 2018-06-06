import * as Moment from 'moment';
import {QuestionType} from '../types/Question';

export class ApiParser {

  private readonly convertor = {
    TEXT: {
      fromApi: x => this.fromApiSingleAnswer(x),
      toApi: x => this.toApiSingleAnswer(x)
    },
    LONGTEXT: {
      fromApi: x => this.fromApiSingleAnswer(x),
      toApi: x => this.toApiSingleAnswer(x)
    },
    DATE: {
      fromApi: x => this.dateFormat ? this.fromApiDate(this.fromApiSingleAnswer(x)) : this.fromApiSingleAnswer(x),
      toApi: x => this.dateFormat ? this.toApiSingleAnswer(this.toApiDate(x)) : this.toApiSingleAnswer(x)
    },
    RADIO: {
      fromApi: x => this.fromApiSingleAnswer(x),
      toApi: x => this.toApiSingleAnswer(x)
    },
    SELECT: {
      fromApi: x => this.fromApiSingleAnswer(x),
      toApi: x => this.toApiSingleAnswer(x)
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

  constructor(private dateFormat?: string) {
  }

  fromApi(questionType: QuestionType) {
    return this.convertor[questionType].fromApi;
  }

  toApi(questionType: QuestionType) {
    return this.convertor[questionType].toApi;
  }

  private fromApiSingleAnswer(answers: string[]) {
    return (answers && answers[0]) || '';
  }

  private toApiSingleAnswer(answer: string) {
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
