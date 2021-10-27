import React from "react";
import {RecoilRoot} from "recoil";
import FormDisplay from "./FormDisplay";
import {FormProps} from "./FormProps";

const Form = (props: FormProps) => {
  return (
    <RecoilRoot>
      <FormDisplay {...props} />
    </RecoilRoot>
  )
}

export default Form
