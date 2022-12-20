import { FC } from 'react'
import './reset.css'
import Tabs from './components/Tabs'
import PageInput from './components/PageInput'
import PageList from './components/PageURLList'
import { Provider } from './components/provider'
import { State } from './components/reducer'

type TabsType = {
  label: string
  index: number
  Component: FC<{}>
}[]

const tabs: TabsType = [
  {
    label: 'Input',
    index: 1,
    Component: PageInput
  },
  {
    label: 'Url List',
    index: 2,
    Component: PageList
  }
]

type Props = {
  state?: State
}

const App: FC<Props> = ({ state }) => {
  return (
    <div className="container">
      <Provider savedState={state}>
        <Tabs tabs={tabs} />
      </Provider>
    </div>
  )
}

export default App
