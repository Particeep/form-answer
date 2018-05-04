import {ISection} from "./Section";
import {Id} from "./Id";

export type FormId = Id;

export interface IForm {
    id: FormId;
    name: string;
    created_at: Date;
    sections: ISection[];
}