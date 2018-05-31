import * as React from 'react';
import {Provider} from 'react-redux';
import {form, s1_qRADIO} from './utils/form';
import {Form} from '../lib/Form';
import {testStore} from './utils/store';
import QuestionRadio from '../lib/Form/Question/Radio/QuestionRadio';
import * as enzyme from 'enzyme';

test('Question TEXT', () => {
    const $form = enzyme.shallow(
        <Provider store={testStore}>
            <Form form={form(s1_qRADIO)}/>
        </Provider>
    );
    console.log($form.find(QuestionRadio).length);
});