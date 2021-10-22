import {useMemo} from "react"
import {useDispatch} from "react-redux"
import {Action, bindActionCreators, Dispatch} from "@reduxjs/toolkit"
import formAnswerAction from "../Form/form.action";

export const useFormActions = () => {
  const dispatch: Dispatch<Action> = useDispatch()
  return useMemo(
    () => {
      return bindActions(formAnswerAction, dispatch) as typeof formAnswerAction
    },
    [dispatch]
  )
}

const bindActions = (actions, dispatch: Dispatch<Action>) => {
  return Object.keys(actions)
    .reduce((acc: any, key: string) => {
      const actionCreator: any = actions[key]
      if (typeof actionCreator === "function") {
        acc[key] = bindActionCreators(actionCreator, dispatch)
      }
      if (typeof actionCreator === "object") {
        acc[key] = bindActions(actionCreator, dispatch)
      }
      return acc
    }, {})
}
