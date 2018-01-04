import "normalize.css/normalize.css";

import React, {Component} from "react";
import Form from "./Form/Form";

const form = {
    "id": "3ff1c761-c213-4c4e-b0b2-c66d2edc4961",
    "created_at": "2017-10-04T13:27:44Z",
    "name": "LOAN_INVESTMENT",
    "description": "gea",
    "tag": "LOAN_INVESTMENT",
    "last_updated_at": "2017-12-19T10:42:18Z",
    "sections": [{
        "id": "a17d44e1-d655-4868-90b8-b79f22d35d73",
        "created_at": "2017-10-04T13:27:45Z",
        "form_id": "3ff1c761-c213-4c4e-b0b2-c66d2edc4961",
        "name": "LOAN_INVESTMENT",
        "index": 0,
        "questions": [{
            "id": "1b4afd5b-ffe8-4c38-917b-5c383bcf3e2f",
            "created_at": "2018-01-04T10:58:12Z",
            "section_id": "a17d44e1-d655-4868-90b8-b79f22d35d73",
            "label": "1.6",
            "question_type": "TEXT",
            "required": false,
            "index": 0,
            "possibilities": []
        }, {
            "id": "9968b6b9-cd91-40de-b49f-59a1631ac1b6",
            "created_at": "2018-01-04T10:58:01Z",
            "section_id": "a17d44e1-d655-4868-90b8-b79f22d35d73",
            "label": "Comment ça va ?",
            "question_type": "TEXT",
            "required": false,
            "index": 1,
            "possibilities": []
        }, {
            "id": "66d13bc6-a907-4d53-9b4c-dabc066d120e",
            "created_at": "2018-01-04T10:58:07Z",
            "section_id": "a17d44e1-d655-4868-90b8-b79f22d35d73",
            "label": "Depuis quand ?",
            "question_type": "TEXT",
            "required": false,
            "index": 2,
            "possibilities": []
        }, {
            "id": "0e12acce-33be-4fb0-b0df-3666116de0fa",
            "created_at": "2018-01-04T10:58:02Z",
            "section_id": "a17d44e1-d655-4868-90b8-b79f22d35d73",
            "label": "2",
            "question_type": "TEXT",
            "required": false,
            "index": 3,
            "possibilities": []
        }]
    }, {
        "id": "d8298205-4156-44be-beae-6feaeba1b095",
        "created_at": "2018-01-04T13:51:27Z",
        "form_id": "3ff1c761-c213-4c4e-b0b2-c66d2edc4961",
        "index": 1,
        "questions": [{
            "id": "dd032a89-ee0b-44d2-938f-2ea22732715c",
            "created_at": "2018-01-04T13:51:30Z",
            "section_id": "d8298205-4156-44be-beae-6feaeba1b095",
            "label": "&&&é",
            "question_type": "CHECKBOX",
            "required": false,
            "index": 0,
            "possibilities": []
        }]
    }, {
        "id": "4f89c522-ef26-4a11-b76f-07d91d1e7cda",
        "created_at": "2018-01-04T13:50:08Z",
        "form_id": "3ff1c761-c213-4c4e-b0b2-c66d2edc4961",
        "index": 2,
        "questions": [{
            "id": "944f17c6-19df-44cc-be6c-bd857756da24",
            "created_at": "2018-01-04T13:50:09Z",
            "section_id": "4f89c522-ef26-4a11-b76f-07d91d1e7cda",
            "label": "geageageagae",
            "question_type": "TEXT",
            "required": false,
            "index": 0,
            "possibilities": []
        }, {
            "id": "83723758-958f-4496-be0b-5f2f2480e780",
            "created_at": "2018-01-04T13:50:12Z",
            "section_id": "4f89c522-ef26-4a11-b76f-07d91d1e7cda",
            "label": "geagaea aaxxx",
            "question_type": "RADIO",
            "required": false,
            "index": 1,
            "possibilities": []
        }, {
            "id": "54557e4f-1995-4517-bcbd-85a29c66e89a",
            "created_at": "2018-01-04T13:50:39Z",
            "section_id": "4f89c522-ef26-4a11-b76f-07d91d1e7cda",
            "label": "",
            "question_type": "LONGTEXT",
            "required": false,
            "index": 2,
            "possibilities": []
        }, {
            "id": "ae03573d-277e-4774-8ed1-cd37a3565781",
            "created_at": "2018-01-04T13:50:44Z",
            "section_id": "4f89c522-ef26-4a11-b76f-07d91d1e7cda",
            "label": "",
            "question_type": "DATE",
            "required": false,
            "index": 3,
            "possibilities": []
        }]
    }]
};

class App extends Component {
    render() {
        return (
            <Form form={form}/>
        );
    }
}

export default App;