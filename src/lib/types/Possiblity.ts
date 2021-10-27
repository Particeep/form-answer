import {Id} from './Id';
import {QuestionId} from './Question';

export type PossibilityId = Id;

export interface IPossibility {
  id: PossibilityId;
  question_id: QuestionId;
  label: string;
  weight: number;
  index: number;
}

export interface ICheckedPossibilityIds {
  [key: string]: PossibilityId
}
