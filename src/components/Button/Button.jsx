import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { default as ButtonMUI } from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import ButtonStyles from 'assets/jss/buttonStyles.jsx'

class ButtonContainer extends React.Component {
  render() {
    const { classes, icon, onClick, responsive, title, variant, width } = this.props
    const showText = !responsive || width !== 'xs'
    return (
      <ButtonMUI size="medium" variant={variant || 'outlined'} color="primary" onClick={onClick} className={classes.root}>
        {icon && <Icon component={icon} className={classnames(classes.icon, showText && classes.iconWithText)} /> }
        {showText && title}
      </ButtonMUI>
    )
  }
}

class Button extends React.Component {
  render() {
    const { to, ...restProps } = this.props

    if (!to) {
      return <ButtonContainer {...restProps}/>
    }

    return (
      <Link to={to}>
        <ButtonContainer {...restProps}/>
      </Link>
    )
  }
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  responsive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.string
}

Button.defaultProps = {
  responsive: false
}

export default withWidth()(withStyles(ButtonStyles)(Button))