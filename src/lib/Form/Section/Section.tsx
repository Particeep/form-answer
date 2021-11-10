import './Section.scss';

import * as React from 'react';
import Button from '@material-ui/core/Button';
import {Question} from '../Question';
import {IQuestion} from '../../types/Question';
import {ISection} from '../../types/Section';
import ReactHtmlParser from 'react-html-parser';
import {urlify} from "../../utils/common";
import {useFormContext} from "../FormContext";
import {Box, CircularProgress} from "@material-ui/core";

export interface ExpensionStepProps {
  readonly isLast?: boolean;
  readonly loading?: boolean;
  readonly index?: number;
  readonly prev?: () => void;
  readonly next?: () => void;
  readonly firstStepPrevCb?: () => void
}

interface Props {
  readonly section: ISection;
}

const Section = (props: Props & ExpensionStepProps) => {

  const {section, isLast, index, prev, next, loading, firstStepPrevCb} = props

  const {state} = useFormContext()
  const {checkedPossibilityIds, readonly, messages, answers, sectionsValidity} = state
  const valid = isValid(sectionsValidity[section.id])

  const showQuestion = (q: IQuestion) => {
    if (!q.possibility_id_dep) return true;
    for (let k in checkedPossibilityIds) {
      if (checkedPossibilityIds[k] === q.possibility_id_dep) return true;
    }
    return false;
  }

  const nextLabel: string = isLast ? messages.buttonEnd : messages.buttonNext

  const onPrev = index > 0 ? prev : firstStepPrevCb

  return (
    <main>
      <div className="Section_label">
        {ReactHtmlParser(urlify(section.description))}
      </div>
      {section.questions.map(q => {
        const answer = answers[q.id]
        const isValid = (sectionsValidity[q.section_id] || [])[q.id]
        return showQuestion(q) ? <Question key={q.id} question={q} answer={answer} isValid={isValid}/> : ""
      })}
      {!readonly &&
      <div className="Section_action">
        {(index > 0 || firstStepPrevCb) &&
        <Button color="secondary" onClick={onPrev} className="Section_prev">
          {messages.buttonPrevious}
        </Button>
        }
        <Box ml={1} display={"inline"}>
          <Button variant="contained" color="secondary" onClick={next} disabled={!valid || (isLast && loading)}
                  className={'Section_' + (isLast ? 'end' : 'next')}>
            {!loading && nextLabel}
            {loading && <CircularProgress size={24} />}
          </Button>
        </Box>
      </div>
      }
    </main>
  );
}

function isValid(validity: { [key: string]: boolean }): boolean {
  return validity ? Object.values(validity).every(v => !!v) : false;
}

export default Section
