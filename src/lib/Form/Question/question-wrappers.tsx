import * as React from 'react';
import {IQuestion} from '../../types/Question';
import {IMessages} from '../../types/Messages';
import {isCheckboxValid, isRadioValid, isSelectValid, isTextValid, Validation} from './question-validations';

export interface MappedQuestionProps {
  readonly readonly: boolean;
  readonly question: IQuestion;
  readonly messages: IMessages,
  readonly isValid: boolean;
  readonly onChange: (value: string | string[]) => void;
  readonly value: any; // TODO string[] | string;
}

export interface WrappedQuestionProps {
  readonly readonly: boolean;
  readonly question: IQuestion;
  readonly messages: IMessages,
  readonly isValid: boolean;
  readonly onChange: (value: string[], valid: boolean) => void;
  readonly answer: string[]; // TODO string[] | string;
}

export const mapProps = (
  map: (a: string[]) => string | string[],
  parse: (a: string | string[]) => string[],
  validation: Validation
) => <P extends MappedQuestionProps>(
  Component: React.ComponentType<any>
): any => {

  return class MappedQuestion extends React.Component<WrappedQuestionProps, {}> {

    render() {
      const {answer, ...other} = this.props;
      return <Component {...other} value={map(answer)} onChange={this.change}/>;
    }

    componentDidMount() {
      const {answer} = this.props;
      this.change(map(answer));
    }

    private change = (value: string | string[]) => {
      const {onChange, question} = this.props;
      return onChange(parse(value), validation(question, value));
    }
  }
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
