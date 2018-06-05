import {IQuestion, QuestionType} from '../../lib/types/Question';
import {IForm} from '../../lib/types/Form';

export const form = (question: IQuestion | IQuestion[]): IForm => <any> ({
  id: 'F1',
  name: 'Dépôt de dossier',
  description: 'Information projet',
  sections: [{
    id: 'S1',
    form_id: 'F1',
    name: 'Sélection de l’appel à candidature et des leviers d’optimisation ',
    index: 0,
    questions: Array.isArray(question) ? question : [question],
  }]
});

interface Is1_questionSimple {
  type?: QuestionType,
  required?: boolean;
  answer?: string;
  pattern?: boolean;
  possibility_id_dep?: string;
}

export const s1_questionSimple = ({type = 'TEXT', required = false, answer, pattern, possibility_id_dep}: Is1_questionSimple
): IQuestion => <any>({
  id: 'Q1',
  section_id: 'S1',
  label: 'Appel à candidature obligatoire :',
  question_type: type,
  required: required,
  pattern: pattern && '\\d+',
  possibility_id_dep: possibility_id_dep,
  index: 0,
  answers: answer && [answer]
});

interface Is1_questionWithPossibilities {
  type?: QuestionType,
  required?: boolean,
  answered?: boolean
}

export const s1_questionWithPossibilities = (
  {type = 'RADIO', required = false, answered = false}: Is1_questionWithPossibilities
): IQuestion => <any> ({
  id: 'Q2',
  section_id: 'S1',
  label: 'Appel à candidature obligatoire :',
  question_type: type,
  required: required,
  index: 0,
  possibilities: [{
    id: 'P1',
    question_id: 'Q2',
    label: 'P1',
    index: 0,
  }, {
    id: 'P2',
    question_id: 'Q2',
    label: 'P2',
    index: 1,
  }],
  answers: answered ? ['P2'] : []
});

