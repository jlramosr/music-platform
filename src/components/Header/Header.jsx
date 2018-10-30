import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from 'components/Menu/Menu.jsx'
import HeaderStyles from 'assets/jss/headerStyles.jsx'
import logo from 'assets/img/logo.png'

class Header extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <div className={classes.grow}>
              <img src={logo} alt="logo" className={classes.logo}/>
            </div>
            <Menu />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(HeaderStyles)(Header)