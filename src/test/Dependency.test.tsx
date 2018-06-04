import * as React from 'react';
import {form, s1_questionSimple, s1_questionWithPossibilities} from './utils/form';
import * as enzyme from 'enzyme';
import {testStore} from './utils/store';
import {Provider} from 'react-redux';
import {Form} from '../lib/Form';
import {Button, RadioGroup} from 'material-ui';


test('Dependable question got displayed when the associated possibility got checked', () => {
    const formWithDep = form([
        s1_questionWithPossibilities({
            required: true,
        }),
        s1_questionSimple({
            required: true,
            possibility_id_dep: 'P2'
        })
    ]);

    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={formWithDep}/>
        </Provider>
    );
    expect($form.find('.Question-Q1').length).toEqual(0);

    const $radioGroup = $form.find(RadioGroup).get(0);
    $radioGroup.props.onChange({target: {value: 'P2'}});
    $form.update();

    expect($form.find('.Question-Q1').length).toEqual(1);
});

test('Section pass from invalid to valid when a required dependable question got hidden', () => {
    const formWithDep = form([
        s1_questionWithPossibilities({
            required: true,
            answered: true,
        }),
        s1_questionSimple({
            required: true,
            possibility_id_dep: 'P2'
        })
    ]);

    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={formWithDep}/>
        </Provider>
    );
    expect($form.find(Button).get(0).props.disabled).toBe(true);

    const $radioGroup = $form.find(RadioGroup).get(0);
    $radioGroup.props.onChange({target: {value: 'P1'}});
    $form.update();

    expect($form.find(Button).get(0).props.disabled).toBe(false);
});