import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#37BB91'
    },
    secondary: {
      main: '#111242'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'monospace, "Roboto, "Helvetica", "Arial", sans-serif'
  }
})

export default theme