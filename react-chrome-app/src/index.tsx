import React from 'react'
import ReactDOM from 'react-dom/client'
import { storage } from '@extend-chrome/storage'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

storage.local.get('openUrlsState').then(data => {
  root.render(
    <React.StrictMode>
      <App state={data.openUrlsState} />
    </React.StrictMode>
  )
})
