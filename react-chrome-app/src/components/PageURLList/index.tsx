import { FC, Fragment, useContext, useMemo } from 'react'
import { context } from '../provider'
import './styles.css'

const TabTwo: FC<{}> = () => {
  const { state, dispatch } = useContext(context)
  const handleNextClick = () => {
    dispatch && dispatch({ type: 'openNext' })
  }
  const items = useMemo(() => {
    return state.urlList?.map(item => {
      const className =
        item.index === state.activeIndex
          ? 'list-item list-item-active'
          : 'list-item'
      const handleClick = () => {
        dispatch &&
          dispatch({
            type: 'openSelected',
            payload: { selectedIndex: item.index }
          })
      }
      return (
        <li
          className={className}
          id={`item${item.index}`}
          onClick={handleClick}
        >
          <a href={`#item${item.index}`}>{item.url}</a>
        </li>
      )
    })
  }, [state.urlList, state.activeIndex, dispatch])

  return (
    <Fragment>
      <div className="list">{items}</div>
      <button className="next-button" onClick={handleNextClick}>
        Next
      </button>
    </Fragment>
  )
}
export default TabTwo
