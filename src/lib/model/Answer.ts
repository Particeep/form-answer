import {QuestionType} from "./Question";
import {Id} from "./Id";

export type AnswerId = Id;

export interface Answer {
    question_id: AnswerId;
    answer: string;
}

function hasPossibilities(question: any): boolean {
    return question.question_type == QuestionType.CHECKBOX
        || question.question_type == QuestionType.RADIO
        || question.question_type == QuestionType.SELECT;
}