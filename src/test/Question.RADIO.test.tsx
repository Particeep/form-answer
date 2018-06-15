import * as React from 'react';
import {Provider} from 'react-redux';
import {form, s1_questionWithPossibilities} from './utils/form';
import {Form} from '../lib/Form';
import {testStore} from './utils/store';
import * as enzyme from 'enzyme';
import {Button, RadioGroup} from '@material-ui/core';
import {QuestionType} from '../lib/types/Question';

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

test('data passed by onChange callback are correctly formatted when answering a RADIO question', (done) => {
  let answer;

  const $form = enzyme.mount(
    <Provider store={testStore}>
      <Form
        form={form(s1_questionWithPossibilities({type: QuestionType.RADIO, required: true, answered: false}))}
        onChange={(a) => answer = a}/>
    </Provider>
  );

  const $radioGroup = $form.find(RadioGroup).get(0);
  $radioGroup.props.onChange({target: {value: 'P1'}});
  $form.update();

  setTimeout(() => {
    expect(answer.answer).toEqual(['P1']);
    done();
  }, 1000);
});
