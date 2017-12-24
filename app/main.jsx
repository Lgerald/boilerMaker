import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Root from './components/root.jsx'
if (process.env.NODE_ENV === "development") {
  require("./secret.js");
}
require("./main.jsx");

import '../public/index.css'

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
)