import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FooterLinkStyles from 'assets/jss/footerLinkStyles.jsx'

class FooterLink extends React.Component {
  render() {
    const { classes, img, url } = this.props
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={img} alt="link" className={classes.root}/>
      </a>
    )
  }
}

FooterLink.propTypes = {
  classes: PropTypes.object.isRequired,
  img: PropTypes.node.isRequired,
  url: PropTypes.object
}

export default withStyles(FooterLinkStyles)(FooterLink)