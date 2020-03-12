import * as React from 'react';
import {Button} from '@material-ui/core'

const TestFormCp = props => {
  console.log(props)
  return (
    <Button
      color={"primary"}
      variant={"contained"}
      {...props}
    >
      testBtn
    </Button>
  )
}

export default TestFormCp
