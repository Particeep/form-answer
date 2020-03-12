import './QuestionDocument.scss';

import * as React from 'react';
import {Avatar, Chip, Icon, withTheme, WithTheme} from '@material-ui/core';
import {IMessages} from '../../../types/Messages';

interface Props {
  readonly documentName: string;
  readonly documentUrl: string;
  readonly messages: IMessages;
  readonly isValid: boolean;
}

interface State {
  errorMessage: string;
}

class QuestionDocumentReadonly extends React.Component<Props & WithTheme, State> {

  state: State = {
    errorMessage: null
  };

  render() {
    const {isValid, documentName, documentUrl, messages, theme} = this.props;
    return (
      <main className="QuestionDocument">
        {documentUrl &&
        <Chip
          className="QuestionDocument_doc" label={documentName}
          onClick={() => window.open(documentUrl, '_blank')}
          avatar={
            <Avatar>
              <Icon className="QuestionDocument_doc_i">insert_drive_file</Icon>
            </Avatar>
          }
        />
        }

        {this.state.errorMessage &&
        <div className="QuestionDocument_error">
          <Icon className="QuestionDocument_error_i">warning</Icon>
          {this.state.errorMessage}
          <Icon className="QuestionDocument_error_clear" onClick={() => this.setState({errorMessage: ''})}>clear</Icon>
        </div>
        }
        {!documentUrl &&
        <div style={{fontStyle: 'italic', ...(!isValid && {color: theme.palette.error['500']})}}>
          {messages.noFile}
        </div>
        }
      </main>
    );
  }
}

export default withTheme(QuestionDocumentReadonly);
