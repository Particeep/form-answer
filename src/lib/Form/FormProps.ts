import {IForm} from "../types/Form";
import {IMessages} from "../types/Messages";
import {IAnswer} from "../types/Answer";
import {IDoc} from "../types/Doc";

export interface FormProps {
  form: IForm;
  readonly?: boolean;
  dateFormat?: string;
  lang?: string;
  messages?: IMessages;
  maxUploadFileSize?: number;
  scrollOffset: number;
  onChange?: (a: IAnswer) => void;
  onSectionEnd?: (a: IAnswer[]) => void;
  onEnd?: (a: IAnswer[]) => void;
  onUploadFile?: (file: File, callback: (d: IDoc) => void) => void;
  onRemoveFile?: (id: string) => void;
}
