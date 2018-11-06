import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import HomeStyles from 'assets/jss/homeStyles.jsx'
import HomeCard from './HomeCard.jsx'
import artistsImg from 'assets/img/artists.png'
import genresImg from 'assets/img/genres.png'
import { openDialog } from 'store/actions/ui'

class Home extends React.Component {
  render() {
    const { classes, openDialog } = this.props
    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={12} sm={6} className={classes.card}>
          <HomeCard title="Artists" img={artistsImg} to="/artists" create={openDialog} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.card}>
          <HomeCard title="Genres" img={genresImg} to="/genres"/>
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.func
}

const mapDispatchToProps = dispatch => {
  return {
    openDialog: () => dispatch(openDialog({
      category: 'artists',
      edit: false
    }))
  }
}

export default connect(null, mapDispatchToProps)(
  withStyles(HomeStyles)(Home)
)
