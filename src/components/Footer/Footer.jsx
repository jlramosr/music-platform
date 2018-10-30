import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FooterLink from 'components/Footer/FooterLink.jsx'
import FooterStyles from 'assets/jss/footerStyles.jsx'
import github from 'assets/img/github.png'
import instagram from 'assets/img/instagram.png'
import linkedin from 'assets/img/linkedin.png'

class Footer extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <FooterLink href="https://github.com/jlramosr" img={github} />
        <FooterLink href="https://www.instagram.com/reactjspain" img={instagram} />
        <FooterLink href="https://www.linkedin.com/in/jlramosr" img={linkedin} />
        <Typography variant="overline" gutterBottom>
          &copy; {(new Date()).getFullYear()} Jose Ramos
        </Typography>
      </div>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(FooterStyles)(Footer)