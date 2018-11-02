import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Button from 'components/Button/Button.jsx'
import homeIcon from '@material-ui/icons/Home'
import artistsIcon from '@material-ui/icons/Face'
import genresIcon from '@material-ui/icons/Mic'

class Menu extends React.Component {
  render() {
    const { location: { pathname } } = this.props

    if (pathname === '/') {
      return <React.Fragment></React.Fragment>
    }

    return (
      <React.Fragment>
        <Button title="Home" to="/" icon={homeIcon} responsive />
        {!pathname.startsWith('/artists') && <Button title="Artists" to="/artists" icon={artistsIcon} responsive />}
        {!pathname.startsWith('/genres') && <Button title="Genres" to="/genres" icon={genresIcon} responsive />}
      </React.Fragment>
    )
  }
}

Menu.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Menu)