import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from 'theme'
import 'index.css'
import App from 'scenes/App/App.jsx'
import * as serviceWorker from 'serviceWorker'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>, 
  document.getElementById('root')
)

serviceWorker.register()
