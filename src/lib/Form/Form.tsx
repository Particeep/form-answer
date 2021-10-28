import React from "react";
import FormDisplay from "./FormDisplay";
import {FormProps} from "./FormProps";
import {FormProvider} from "./FormContext";

const Form = (props: FormProps) => {
  return (
    <FormProvider>
      <FormDisplay {...props} />
    </FormProvider>
  )
}

export default Form
