import {Id} from './Id';

export type AnswerId = Id;

export interface IAnswer {
  question_id: AnswerId;
  answer: string;
}
