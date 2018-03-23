import "./QuestionDocument.scss";

import React, {Component} from "react";
import {Avatar, Button, Chip, CircularProgress, Icon, withTheme} from "material-ui";
import {connect} from "react-redux";
import {questionWrapper} from "../questionWrapper";

class QuestionDocumentReadonly extends Component {

    state = {
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

export default withTheme()(QuestionDocumentReadonly);