import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import MenuButtonStyles from 'assets/jss/menuButtonStyles.jsx'

class MenuButton extends React.Component {
  render() {
    const { classes, icon, title, to } = this.props
    return (
      <Link to={to}>
        <Button size="medium" variant="outlined" color="primary" className={classes.button}>
          {icon && <Icon component={icon} className={classes.icon} /> }
          {title}
        </Button>
      </Link>
    )
  }
}

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default withStyles(MenuButtonStyles)(MenuButton)