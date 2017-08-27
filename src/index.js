import React from 'react'
import { render } from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './containers/App'



let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)