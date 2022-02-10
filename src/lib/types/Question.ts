import {IPossibility} from './Possiblity';
import {Id} from './Id';
import {SectionId} from './Section';

export type QuestionId = Id;

export enum QuestionType {
  RADIO = 'RADIO',
  SELECT = 'SELECT',
  TEXT = 'TEXT',
  LONGTEXT = 'LONGTEXT',
  CHECKBOX = 'CHECKBOX',
  DOCUMENT = 'DOCUMENT',
  DATE = 'DATE',
  LABEL = 'LABEL',
}

export interface IQuestion {
  id: QuestionId;
  section_id: SectionId;
  possibility_id_dep: string;
  label: string;
  description?: string;
  question_type: QuestionType;
  required: boolean;
  possibilities: IPossibility[];
  valid_possibility_ids: string;
  pattern: string;
  answers: string[];
  index: number; // Position
}

export const hasPossibilities = (q: any): boolean => q.question_type == QuestionType.CHECKBOX || q.question_type == QuestionType.RADIO || q.question_type == QuestionType.SELECT;

export const isDependable = (q: IQuestion): boolean => q.question_type === QuestionType.SELECT || q.question_type === QuestionType.RADIO;
