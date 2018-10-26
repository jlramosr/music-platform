import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App.jsx'
import theme from './theme'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('root')
)

serviceWorker.register()
