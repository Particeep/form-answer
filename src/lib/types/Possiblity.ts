import {Id} from './Id';
import {QuestionId} from './Question';

export type PossiblityId = Id;

export interface IPossibility {
  id: PossiblityId;
  question_id: QuestionId;
  label: string;
  weight: number;
  index: number;
}
