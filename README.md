# Form-answer

### About

Form-answer is a React application whose purpose is to answer to a form created on the [Particeep API](https://api.particeep.com/swagger#/form).

### Installation

Form-answer depends on [Material icons](https://material.io/icons/). See installation instructions [here](http://google.github.io/material-design-icons/#icon-font-for-the-web).

There is two ways to integrate Form-answer to your application.

##### If you work on a React application

Then it's easy ! Install:
```
npm install https://github.com/Particeep/form-ui.git
```

Import the `Form` component as follow:
```
import React, {Component} from "react";
import {Form} from "Form";

class App extends Component {
    render = () => 
        <Form
            // fill params
        />
    ;
}
```

and pass the `formReducer` to your store.
```
import {createStore, combineReducers} from 'redux'
import {formReducer} from 'Form';

const rootReducer = combineReducers({
  // ...your other reducers here
  form: formReducer
})
```

##### Otherwise

You must include the compiled sources in your project then call the React application. Passing params to the props is done through the `window` variable as follow:
 ```
 window.formAnswer = {
    // fill params
 }
 <div id="form-answer-root"></div>
 
 ```
 
### API

##### Inputs:

| Variable                | Type                                       | Description                                                                                                                                                                                                                                 |
|-------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `form`                  | Object                                     | Form to answer fetched from the API                                                                                                                                                                                                         |
| `messages`              | Object                                     | The component expected some text, like messages to display in case of error.                                                                                                                                                                |
| `maxUploadFileSize`     | number _(optional)_                        | Limit the size of the uploaded documents. If undefined, file size won't be checked                                                                                                                                                          |
| `dateFormat`            | string _(optional)_                        | Expected format of the question of type date (eg. dd/MM/yyy, yyyy-MM-dd). If undefined, answers for this type of question are not validated.                                                                                                |
| `readonly`              | boolean _(optional)_                       | If set to true, the form cannot be answered (default value is false)                                                                                                                                                                        |

##### Outputs:

| Functions               | Parameters                                        | Description                                                                                                                                                                                                                 |
|-------------------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onChange`              | answer: Object                                    | Whenever a change if performed on a question; `answer` is the answer that triggered the callback.                                                                                                                           |
| `onSectionEnd`          | sectionAnswers: Array                             | On pressing the next button of a section; `sectionAnswers` is an array of answers.                                                                                                                                          |
| `onEnd`                 | answers: Array                                    | On pressing the last button of the form; `answers` is an array of answers.                                                                                                                                                  |
| `onUploadFile`          | file: File, callback: Function({name, permalink}) | Whenever a document is selected; `file` is the uploaded file, `callback` is a method which must be called to returned the uploaded file. At least two properties of the returned file are required: `file` and `permalink`. |

### Example

```
import React, {Component} from "react";
import {Form} from "Form";

class App extends Component {

    render = () =>
        <Form
            form={this.getForm()}
            messages={{
                search: 'Search...',
                buttonNext: 'Next',
                buttonEnd: 'End',
                buttonPrevious: 'Previous',
                upload: 'Choose file',
                invalidFileSize: 'File limit exceed',
                invalidDate: 'Date invalid',
                invalidText: 'Invalid answer',
                noFile: 'No file uploaded'
            }}
            maxUploadFileSize={12}
            onChange={this.changed}
            onSectionEnd={this.sectionEnded}
            onEnd={this.ended}
            onUploadFile={this.uploadFile}/>
    ;

    uploadFile = (file, callback) => {
        console.log('uploadFile', file);
        // Simulate uploading delay
        setTimeout(() => callback({
            name: file.name,
            permalink: 'https://api.particeep.com/swagger'
        }), 1000);
    };

    changed = (answer) => {
        console.log('onChange', answer);
    };

    sectionEnded = (sectionAnswers) => {
        console.log('onSectionEnd', sectionAnswers);
    };

    ended = (answers) => {
        console.log('onEnd', answers);
    };

    getForm = () => ({
        "id": "3ff1c761-c213-4c4e-b0b2-c66d2edc4961",
        "name": "Party Invite",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "sections": [{
            "id": "a17ds4e1-d655-4868-90b8-b79f22d35d73",
            "form_id": "3ff1c761-c213-4c4e-b0b2-c66d2edc4961",
            "name": "Personnal informations",
            "index": 0,
            "description": "Let us know what kind of dish(es) you'll be bringing",
            "questions": [{
                "id": "1b4afd5b-ffe8-4c38-917b-5c3ssbcf3e2f",
                "section_id": "a17ds4e1-d655-4868-90b8-b79f22d35d73",
                "label": "What is your name?",
                "question_type": "TEXT",
                "required": true,
                "index": 0,
                "answers": ["Particeep"]
            }]
        }]
    })
}
```
