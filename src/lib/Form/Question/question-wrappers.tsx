import * as React from 'react';
import {IQuestion} from '../../types/Question';
import {Subtract} from 'utility-types';
import {IMessages} from '../../types/Messages';
import {isCheckboxValid, isRadioValid, isSelectValid, isTextValid, Validation} from './question-validations';
import {QuestionProps} from './Question';

export interface MappedQuestionProps {
  readonly readonly: boolean;
  readonly question: IQuestion;
  readonly messages: IMessages,
  readonly isValid: boolean;
  readonly multiline?: boolean,
  readonly multiSelect?: boolean;
  readonly rows?: number,
  readonly rowsMax?: number,
  readonly onChange: (value: string | string[]) => void;
  readonly value: any; // TODO string[] | string;
  readonly dateFormat?: string;
}

export const questionWrapper = <P extends MappedQuestionProps>(WrappedQuestion: React.ComponentType<P>) => {

  interface Props {
    readonly rows?: number,
    readonly rowsMax?: number,
    readonly multiline?: boolean,
    readonly readonly: boolean;
    readonly multiSelect?: boolean;
    readonly dateFormat?: string;
    readonly question: IQuestion;
    readonly messages: IMessages,
    readonly isValid: boolean;
    readonly value: any,
    readonly onChange: (value: string | string[]) => void,
  }

  return class QuestionWrapper extends React.Component<Subtract<P, MappedQuestionProps> & Props, {}> {

    render() {
      return <WrappedQuestion {...this.props}/>
    }

    componentDidMount() {
      const {value, onChange} = this.props;
      onChange(value);
    }
  }
};

export const mapProps = (
  map: (a: string[]) => string | string[],
  parse: (a: string | string[]) => string[],
  validation: (q: IQuestion, value: string | string[]) => boolean
) => Component => (props: any) => {
  const {answer, onChange, ...other} = props;
  const change = (value: string) => onChange(parse(value), validation(props.question, value));
  return <Component {...other} value={map(answer)} onChange={change}/>;
};

export const mapSingleValue = (answer: string[]): string => answer && answer[0] || '';

export const parseSingleValue = (value: string): string[] => value && [value];

export const mapMultipleValues = (x: string[]): string[] => x || [];

export const parseMultipleValues = (x: string[]): string[] => x.length === 0 ? null : x;

export const mapMultipleValueProps = (validation: Validation) => mapProps(mapMultipleValues, parseMultipleValues, validation);

export const mapSingleValueProps = (validation: Validation) => mapProps(mapSingleValue, parseSingleValue, validation);

export const mapRadioProps = mapSingleValueProps(isRadioValid);

export const mapSelectProps = mapSingleValueProps(isSelectValid);

export const mapTextProps = mapSingleValueProps(isTextValid);

export const mapCheckboxProps = mapMultipleValueProps(isCheckboxValid);
