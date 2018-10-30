import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppContent from './AppContent.jsx'
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import AppStyles from 'assets/jss/appStyles.jsx'

class App extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.header}><Header /></div>
        <div className={classes.content}><AppContent /></div>
        <div className={classes.footer}><Footer /></div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(AppStyles)(App)