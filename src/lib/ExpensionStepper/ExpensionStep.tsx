import './ExpensionStep.scss';
import * as React from 'react';
import {ReactElement} from 'react';
import {Collapse, Icon} from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import {urlify} from '../utils/common';

const animationDuration = 300;

interface Props {
  readonly label: string;
  readonly component: ReactElement<any>;

  // Props from ExpensionStepper
  readonly prev?: () => void;
  readonly next?: () => void;
  readonly goTo?: (i: number) => void;
  readonly free?: boolean;
  readonly index?: number;
  readonly disabled?: boolean;
  readonly isCurrent?: boolean;
  readonly isLast?: boolean;
}

class ExpensionStep extends React.Component<Props, {}> {

  private $root: HTMLElement;

  render() {
    const {disabled, free, isCurrent, index, label, component, goTo} = this.props;
    return (
      <main className={'ExpensionStep ' + (isCurrent ? '-current' : !disabled ? '-done' : '-undone')}
            ref={node => this.$root = node}>
        <header className="ExpensionStep_header" onClick={() => goTo(index)}>
          {!free && !disabled && !isCurrent && <Icon className="ExpensionStep_i">check</Icon>}
          {index + 1}. {ReactHtmlParser(urlify(label))}
        </header>
        <Collapse in={isCurrent} timeout={animationDuration} className="ExpensionStep_body">
          <div className="ExpensionStep_content">
            {React.cloneElement(component, {...this.props})}
          </div>
        </Collapse>
      </main>
    );
  }

  componentDidUpdate(prevProps: any) {
    if (!prevProps.isCurrent && this.props.isCurrent)
      setTimeout(() => this.scrollTop(), animationDuration);
  }

  private scrollTop = () => {
    this.$root.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

export default ExpensionStep;
