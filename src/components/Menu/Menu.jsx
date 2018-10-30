import React from 'react'
import MenuButton from './MenuButton.jsx'
import homeIcon from '@material-ui/icons/Home'
import artistsIcon from '@material-ui/icons/Face'
import genresIcon from '@material-ui/icons/Mic'

export default () => (
  <React.Fragment>
    <MenuButton title="Home" to="/" icon={homeIcon} />
    <MenuButton title="Artists" to="/artists" icon={artistsIcon} />
    <MenuButton title="Genres" to="/genres" icon={genresIcon} />
  </React.Fragment>
)