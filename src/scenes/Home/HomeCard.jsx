import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from 'components/Button/Button.jsx'
import HomeCardStyles from 'assets/jss/homeCardStyles.jsx'

class HomeCard extends React.Component {
  onClickButton() {
    const { onClick } = this.props
    if (onClick) {
      onClick()
    }
  }

  render() {
    const { classes, img, title, to } = this.props
    return (
      <Card>
        <Link to={to}>
          <CardContent className={classes.cardContent}>
            <Avatar alt={title} src={img} className={classes.avatar} />
            <div className={classes.title}>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            </div>
          </CardContent>
        </Link>
        <CardActions>
          <Button title="Create a new one" variant="text" onClick={this.onClickButton}/>
        </CardActions>
      </Card>
    )
  }
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  img: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default withStyles(HomeCardStyles)(HomeCard)
