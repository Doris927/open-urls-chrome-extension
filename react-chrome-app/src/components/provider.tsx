import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { ACTIONTYPE, initialState, reducer, State } from './reducer'
import { storage } from '@extend-chrome/storage'

type Context = {
  state: State
  dispatch?: Dispatch<ACTIONTYPE>
}

type Props = {
  savedState?: State
  children: ReactNode
}

export const context = createContext<Context>({ state: initialState })

export const Provider: FC<Props> = ({ savedState, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (savedState) {
      dispatch({
        type: 'setInitialState',
        payload: {
          state: savedState
        }
      })
    }
  }, [dispatch, savedState])

  useEffect(() => {
    if (state.content) {
      storage.local.set({ openUrlsState: state })
    }
  }, [state])

  const provider = useMemo(() => {
    return (
      <context.Provider value={{ state, dispatch }}>
        {props.children}
      </context.Provider>
    )
  }, [state, dispatch, props.children])

  return provider
}
