import { FC, useState } from 'react'
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
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index)

  return (
    <div className="container">
      <Provider savedState={state}>
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
      </Provider>
    </div>
  )
}

export default App
