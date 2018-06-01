import {IQuestion, QuestionType} from '../../lib/types/Question';
import {IForm} from '../../lib/types/Form';

export const form = (question: IQuestion): IForm => <any> ({
    'id': 'F1',
    'name': 'Dépôt de dossier',
    'description': 'Information projet',
    'sections': [{
        'id': 'S1',
        'form_id': 'F1',
        'name': 'Sélection de l’appel à candidature et des leviers d’optimisation ',
        'index': 0,
        'questions': [question],
    }]
});

interface Is1_questionSimple {
    type?: QuestionType,
    required?: boolean;
    answer?: string;
    pattern: boolean;
}

export const s1_questionSimple = ({type = 'TEXT', required = false, answer, pattern}: Is1_questionSimple
): IQuestion => <any>({
    'id': 'Q1',
    'section_id': 'S1',
    'label': 'Appel à candidature obligatoire :',
    'question_type': type,
    'required': required,
    'pattern': pattern && '\\d+',
    'index': 0,
    'answers': answer && [answer]
});

interface Is1_questionWithPossibilities {
    type?: QuestionType,
    required?: boolean,
    answered?: boolean
}

export const s1_questionWithPossibilities = (
    {type = 'RADIO', required = false, answered = false}: Is1_questionWithPossibilities
): IQuestion => <any> ({
    'id': 'Q1',
    'section_id': 'S1',
    'label': 'Appel à candidature obligatoire :',
    'question_type': type,
    'required': required,
    'index': 0,
    'possibilities': [{
        'id': 'P1',
        'question_id': 'Q1',
        'label': 'P1',
        'index': 0,
    }, {
        'id': 'P2',
        'question_id': 'Q1',
        'label': 'P2',
        'index': 1,
    }],
    'answers': answered ? ['P2'] : []
});

