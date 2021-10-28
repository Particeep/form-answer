import {ISection} from './Section';
import {Id} from './Id';
import { IMessages } from './Messages';
import { QuestionId } from './Question';
import { IDoc } from './Doc';
import { PossiblityId } from './Possiblity';

export type FormId = Id;

export interface IForm {
  id: FormId;
  name: string;
  created_at: Date;
  sections: ISection[];
}

export interface InitParams {
  messages: IMessages;
  dateFormat: string;
  lang: string;
  maxUploadFileSize?: number;
  readonly?: boolean;
  scrollOffset?: number;
  triggerOnChange?: (qId: QuestionId) => void;
  onUploadFile?: (f: File, callback: (uploadedFile: IDoc) => void) => void;
  onRemoveFile?: (id: string) => void;
  answers?: { [key: string]: string[] };
  sectionsValidity?: { [key: string]: boolean };
  checkedPossibilityIds?: { [key: string]: PossiblityId };
}
