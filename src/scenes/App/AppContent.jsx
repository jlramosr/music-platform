import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Home from 'scenes/Home/Home.jsx'
import Artists from 'scenes/Artists/Artists.jsx'
import Genres from 'scenes/Genres/Genres.jsx'
import AppContentStyles from 'assets/jss/appContentStyles.jsx'

class AppContent extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Route path="/" component={Home} exact />
        <Route path="/artists" component={Artists} />
        <Route path="/genres" component={Genres} />
      </div>
    )
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(AppContentStyles)(AppContent)