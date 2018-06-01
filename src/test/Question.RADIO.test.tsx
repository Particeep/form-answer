import * as React from 'react';
import {Provider} from 'react-redux';
import {form, s1_questionWithPossibilities} from './utils/form';
import {Form} from '../lib/Form';
import {testStore} from './utils/store';
import * as enzyme from 'enzyme';
import {Button, RadioGroup} from 'material-ui';

test('Button next is not disabled when required RADIO is initially filled ', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_questionWithPossibilities({required: true, answered: true}))}/>
        </Provider>
    );
    expect($form.find(Button).get(0).props.disabled).toBe(false);
});

test('Button next should pass from disabled to enable when required radio is filled', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_questionWithPossibilities({required: true, answered: false}))}/>
        </Provider>
    );
    const $btn = () => $form.find(Button).get(0);
    const $radioGroup = $form.find(RadioGroup).get(0);

    expect($btn().props.disabled).toBe(true);
    $radioGroup.props.onChange({target: {value: 'P1'}});
    $form.update();
    expect($btn().props.disabled).toBe(false);
});