import * as React from 'react';
import {IForm} from '../lib/types/Form';
import {Button} from 'material-ui';
import * as enzyme from 'enzyme';
import {testStore} from './utils/store';
import {Provider} from 'react-redux';
import {Form, Section} from '../lib/Form';

const form: IForm = ({
    id: 'F1',
    name: 'Dépôt de dossier',
    description: 'Information projet',
    sections: [{
        id: 'S1',
        form_id: 'F1',
        name: 'Sélection de l’appel à candidature et des leviers d’optimisation ',
        index: 0,
        questions: [{
            id: 'Q11',
            section_id: 'S1',
            label: 'Appel à candidature obligatoire :',
            question_type: 'TEXT',
            required: false,
            index: 0,
        }]
    },
        {
            id: 'S2',
            form_id: 'F1',
            name: 'Sélection de l’appel à candidature et des leviers d’optimisation ',
            index: 0,
            questions: [{
                id: 'Q21',
                section_id: 'S2',
                label: 'Appel à candidature obligatoire :',
                question_type: 'TEXT',
                required: false,
                index: 0,
            }]
        }]
}) as any;

test('Button next display the second section', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form}/>
        </Provider>
    );

    const getSection = (i: number) => $form.find(Section).get(i);

    expect(getSection(0).props.isCurrent).toBe(true);
    expect(getSection(1).props.isCurrent).toBe(false);

    $form.find(Button).get(0).props.onClick();
    $form.update();

    expect(getSection(0).props.isCurrent).toBe(false);
    expect(getSection(1).props.isCurrent).toBe(true);
});