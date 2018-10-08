import './Section.scss';

import * as React from 'react';
import {Button} from '@material-ui/core';
import {Question} from '../Question';
import {connect} from 'react-redux';
import {IMessages} from '../../types/Messages';
import {IQuestion} from '../../types/Question';
import {ISection} from '../../types/Section';
import {urlify} from "../../utils/common";

export interface ExpensionStepProps {
  readonly isLast: boolean;
  readonly index: number;
  readonly prev: () => void;
  readonly next: () => void;
}

interface Props {
  readonly section: ISection;
  readonly isValid: boolean;
  readonly answers: any;
  readonly messages: IMessages;
  readonly readonly: boolean;
  readonly checkedPossibilityIds: any;
}

class Section extends React.Component<Props & ExpensionStepProps, {}> {

  render() {
    const {section, isValid, messages, isLast, index, readonly, prev, next} = this.props;
    return (
      <main>
        <div className="Section_label" dangerouslySetInnerHTML={{__html: urlify(section.description)}}/>
        {section.questions.map(q => {
          if (this.showQuestion(q)) return <Question key={q.id} question={q}/>
        })}
        {!readonly &&
        <div className="Section_action">
          {index > 0 &&
          <Button color="primary" onClick={prev} className="Section_prev">
            {messages.buttonPrevious}
          </Button>
          }
          <Button variant="raised" color="primary" onClick={next} disabled={!isValid}
                  className={'Section_' + (isLast ? 'end' : 'next')}>
            {isLast ? messages.buttonEnd : messages.buttonNext}
          </Button>
        </div>
        }
      </main>
    );
  }

  private showQuestion(q: IQuestion) {
    const {checkedPossibilityIds} = this.props;
    if (!q.possibility_id_dep) return true;
    for (let k in checkedPossibilityIds) {
      if (checkedPossibilityIds[k] === q.possibility_id_dep) return true;
    }
    return false;
  }
}

function isValid(validity: { [key: string]: boolean }): boolean {
  if (validity) return Object.values(validity).every(v => !!v);
}

const state2Props = (state, props) => ({
  isValid: isValid(state.formAnswer.sectionsValidity[props.section.id]),
  answers: state.formAnswer.answers,
  messages: state.formAnswer.messages,
  readonly: state.formAnswer.readonly,
  checkedPossibilityIds: state.formAnswer.checkedPossibilityIds,
});

export default connect(state2Props)(Section);
