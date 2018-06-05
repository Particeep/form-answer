import * as React from 'react';
import {Provider} from 'react-redux';
import {form, s1_questionWithPossibilities} from './utils/form';
import {Form} from '../lib/Form';
import {testStore} from './utils/store';
import * as enzyme from 'enzyme';
import {Button, Checkbox} from 'material-ui';
import {QuestionType} from '../lib/types/Question';

test('Button next is not disabled when required CHECKBOX is initially filled ', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_questionWithPossibilities({type: QuestionType.CHECKBOX, required: true, answered: true}))}/>
        </Provider>
    );
    expect($form.find(Button).get(0).props.disabled).toBe(false);
});

test('Button next pass from disabled to not disabled when required CHECKBOX get filled', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_questionWithPossibilities({type: QuestionType.CHECKBOX, required: true, answered: false}))}/>
        </Provider>
    );

    const $btn = () => $form.find(Button).get(0);
    const $cb = () => $form.find(Checkbox).get(0);
    expect($btn().props.disabled).toBe(true);
    $cb().props.onChange({}, true);
    $form.update();
    expect($btn().props.disabled).toBe(false);
});

test('Button next pass from not disabled to disabled when required CHECKBOX get unfilled', () => {
    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form form={form(s1_questionWithPossibilities({type: QuestionType.CHECKBOX, required: true, answered: true}))}/>
        </Provider>
    );

    const $btn = () => $form.find(Button).get(0);
    const $cb = () => $form.find(Checkbox).get(1);
    expect($btn().props.disabled).toBe(false);
    $cb().props.onChange({}, false);
    $form.update();
    expect($btn().props.disabled).toBe(true);
});

test('data passed by onChange callback are correctly formatted when checking 2 checkboxes', (done) => {
    let answer;

    const $form = enzyme.mount(
        <Provider store={testStore}>
            <Form
                form={form(s1_questionWithPossibilities({type: QuestionType.CHECKBOX, required: true, answered: false}))}
                onChange={(a) => answer = a}/>
        </Provider>
    );

    const $cb = (i: number) => $form.find(Checkbox).get(i);
    $cb(0).props.onChange({}, true);
    $cb(1).props.onChange({}, true);
    $form.update();

    setTimeout(() => {
        expect(answer.answer).toEqual(['P1', 'P2']);
        done();
    }, 1000);
});

