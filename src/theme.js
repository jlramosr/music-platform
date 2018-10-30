import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#37BB91'
    }
  },
  typography: {
    useNextVariants: true
  }
})

export default theme