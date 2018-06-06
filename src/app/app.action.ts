import {IForm} from '../lib/types/Form';

export const appAction = {
  SET: 'app/SET',

  set: (form: IForm) => dispatch => dispatch({type: appAction.SET, form})
};
