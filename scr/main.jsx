import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { worker } from './api/server'
import { store } from './store'
import { fetchTeachers } from './teachers/teachersSlice'
import App from './App'
import './index.css'

async function main() {
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(fetchTeachers())

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

main()