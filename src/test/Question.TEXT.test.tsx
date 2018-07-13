import * as React from 'react';
import {Provider} from 'react-redux';
import {form, s1_questionSimple} from './utils/form';
import {Form} from '../lib/Form';
import {testStore} from './utils/store';
import * as enzyme from 'enzyme';
import {Button, Input} from '@material-ui/core';
import {evt} from './utils/common';

test('Button next is not disabled when required TEXT is initially filled', () => {
  const $form = enzyme.mount(
    <Provider store={testStore}>
      <Form form={form(s1_questionSimple({required: true, answer: 'coucou'}))}/>
    </Provider>
  );
  expect($form.find(Button).get(0).props.disabled).toBe(false);
});

test('Button next pass from disable to enable when required TEXT get filled', () => {
  const $form = enzyme.mount(
    <Provider store={testStore}>
      <Form form={form(s1_questionSimple({required: true}))}/>
    </Provider>
  );
  const $text = () => $form.find(Input).get(0);
  expect($form.find(Button).get(0).props.disabled).toBe(true);
  $text().props.onChange(evt('coucou'));
  $form.update();
  expect($form.find(Button).get(0).props.disabled).toBe(false);
});

test('Button next pass from enable disable when required TEXT get unfilled', () => {
  const $form = enzyme.mount(
    <Provider store={testStore}>
      <Form form={form(s1_questionSimple({required: true, answer: 'coucou'}))}/>
    </Provider>
  );
  const $text = () => $form.find(Input).get(0);
  expect($form.find(Button).get(0).props.disabled).toBe(false);
  $text().props.onChange(evt(''));
  $form.update();
  expect($form.find(Button).get(0).props.disabled).toBe(true);
});

test('Pattern validation', () => {
  const $form = enzyme.mount(
    <Provider store={testStore}>
      <Form form={form(s1_questionSimple({required: true, answer: 'coucou', pattern: true}))}/>
    </Provider>
  );
  const $text = () => $form.find(Input).get(0);
  expect($form.find(Button).get(0).props.disabled).toBe(true);
  $text().props.onChange(evt('1'));
  $form.update();
  expect($form.find(Button).get(0).props.disabled).toBe(false);
  $text().props.onChange(evt('invalid answer'));
  $form.update();
  expect($form.find(Button).get(0).props.disabled).toBe(true);
});

test('data passed by onChange callback are correctly formatted when answering a TEXT question', (done) => {
  let answer;

  const $form = enzyme.mount(
    <Provider store={testStore}>
      <Form
        form={form(s1_questionSimple({required: true, answer: 'coucou', pattern: true}))}
        onChange={(a) => answer = a}/>
    </Provider>
  );

  const $text = () => $form.find(Input).get(0);
  $text().props.onChange(evt('coucou'));
  $form.update();

  setTimeout(() => {
    expect(answer.answer).toEqual(['coucou']);
    done();
  }, 1000);
});
