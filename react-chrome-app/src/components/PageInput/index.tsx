import { FC, Fragment, useCallback, useContext } from 'react'
import { context } from '../provider'
import './styles.css'

const TabOne: FC<{}> = () => {
  const { state, dispatch } = useContext(context)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch &&
        dispatch({
          type: 'setContent',
          payload: {
            content: e.target.value
          }
        })
    },
    [dispatch]
  )

  const handleOnClick = useCallback(() => {
    dispatch &&
      dispatch({
        type: 'init'
      })
  }, [dispatch])

  return (
    <Fragment>
      <textarea
        className="textarea"
        rows={10}
        cols={60}
        onChange={handleChange}
        value={state.content}
      />
      <button className="open-button" onClick={handleOnClick}>
        Open Urls In Order
      </button>
    </Fragment>
  )
}

export default TabOne
