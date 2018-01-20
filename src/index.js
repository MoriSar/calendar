import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import Routes from 'routes'
import registerServiceWorker from 'utils/registerServiceWorker'
import { CookiesProvider } from 'react-cookie'

render(
  <CookiesProvider>
    <Provider store={configureStore()}>
      <Routes />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
)
registerServiceWorker()
