import {IQuestion} from './Question';
import {Id} from './Id';
import {FormId} from './Form';

export type SectionId = Id;

export interface ISection {
  id: SectionId;
  name: string;
  form_id: FormId;
  description: string;
  index: number;
  questions: IQuestion[];
}
