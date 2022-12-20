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
  activeTap: number
}

export type ACTIONTYPE =
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
  | {
      type: 'tabChanged'
      payload: {
        selectedTab: number
      }
    }

export const reducer: Reducer<State, ACTIONTYPE> = (state, action) => {
  const urlList = state.urlList
  switch (action.type) {
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
      return { ...state, urlList: urlItems, activeIndex: 0, activeTap: 2 }
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
    case 'tabChanged':
      return { ...state, activeTap: action.payload.selectedTab }
    default:
      return state
  }
}

export const initialState: State = {
  content: '',
  urlList: undefined,
  activeIndex: 0,
  activeTap: 1
}
