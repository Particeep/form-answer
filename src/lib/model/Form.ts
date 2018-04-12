import {Section} from "./Section";
import {Id} from "./Id";

export type FormId = Id;


export interface Form {
    id: FormId;
    name: string;
    created_at: Date;
    sections: Section[];
}