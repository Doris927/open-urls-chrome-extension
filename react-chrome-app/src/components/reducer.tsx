import { Reducer } from 'react'
import { openUrl } from '../common/common'

type UrlItem = {
  index: number
  url: string
}

export type State = {
  content: string
  urlList?: UrlItem[]
  activeIndex: number
}

export type ACTIONTYPE =
  | {
      type: 'setInitialState'
      payload: {
        state: State
      }
    }
  | {
      type: 'setContent'
      payload: {
        content: string
      }
    }
  | {
      type: 'init'
    }
  | { type: 'openNext' }
  | {
      type: 'openSelected'
      payload: {
        selectedIndex: number
      }
    }

export const reducer: Reducer<State, ACTIONTYPE> = (state, action) => {
  const urlList = state.urlList
  switch (action.type) {
    case 'setInitialState':
      const savedState = action.payload.state
      return {
        ...state,
        content: savedState.content,
        activeIndex: savedState.activeIndex,
        urlList: savedState.urlList
      }
    case 'setContent':
      return { ...state, content: action.payload.content }
    case 'init':
      const urlArr = state.content.trim().split(/[\s\n]/)
      const urlItems = urlArr.map((item, index) => {
        if (index === 0) {
          openUrl(item)
        }
        return {
          index: index,
          url: item
        }
      })
      return { ...state, urlList: urlItems, activeIndex: 0 }
    case 'openNext':
      if (urlList) {
        const newActiveIndex = urlList
          ? (state.activeIndex + 1) % urlList.length
          : 0
        openUrl(urlList[newActiveIndex].url)
        return { ...state, activeIndex: newActiveIndex }
      }
      return state
    case 'openSelected':
      if (urlList) {
        openUrl(urlList[action.payload.selectedIndex].url)
        return { ...state, activeIndex: action.payload.selectedIndex }
      }
      return state
    default:
      return state
  }
}

export const initialState: State = {
  content: '',
  urlList: undefined,
  activeIndex: 0
}
