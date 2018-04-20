import {Id} from "./Id";

export type AnswerId = Id;

export interface Answer {
    question_id: AnswerId;
    answer: string;
}