import * as React from 'react';
import {Provider} from 'react-redux';
import {form, s1_qRADIO} from './utils/form';
import {Form} from '../lib/Form';
import {testStore} from './utils/store';
import * as enzyme from 'enzyme';
import {Button, Radio, RadioGroup} from 'material-ui';
import Test from './Test';

test('Button next is not disabled when required RADIO is initially filled ', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_qRADIO(true, true))}/>
        </Provider>
    );
    expect($form.find(Button).get(0).props.disabled).toBe(false);
});

test('Button next is disabled when required RADIO is not initially filled', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_qRADIO(true, false))}/>
        </Provider>
    );
    expect($form.find(Button).get(0).props.disabled).toBe(true);
});

test('Button next is disabled when required RADIO is not initially filled', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_qRADIO(true, false))}/>
        </Provider>
    );
    const event = {target: {value: 'P2'}};
    const radioGroup = $form.find(RadioGroup);
    const internalRadio = radioGroup.children().first();
    expect($form.find(Button).get(0).props.disabled).toBe(true);
    internalRadio.simulate('change', event, true);
    internalRadio.simulate('change', event, true);
    internalRadio.simulate('change', event, true);
    expect($form.find(Button).get(0).props.disabled).toBe(false);
});

test('', () => {
    const $el = enzyme.mount(
        <Test/>
    )
    const input = $el.find('input');
    input.get(0).props.checked
    input.simulate('change', { target: { checked: true } })
    input.first().simulate('click');
    console.log(input);
});