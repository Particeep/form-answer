import React, {createContext, useReducer, PropsWithChildren} from "react";
import {formReducer, initialState} from "./form.reducer";

const FormContext = createContext(null);

interface FormProviderProps extends PropsWithChildren<{}> {

}

export const FormProvider = ({children}: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{state, dispatch}}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const {state, dispatch} = React.useContext(FormContext);
  return {state, dispatch}
}
