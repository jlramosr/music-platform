import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import NewIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from 'components/Button/Button.jsx'
import { openDialog } from 'store/actions/ui'
import api from 'api/config'
import ListStyles from 'assets/jss/listStyles.jsx'


const ListItemLink = props => {
  return (
    <React.Fragment>
      <Divider />
      <ListItem button component="a" {...props} />
    </React.Fragment>
  )
}

class ArtistsList extends React.Component {
  state = {
    artists: [],
    loading: true
  }

  async componentDidMount() {
    const res = await api.get('/companies')
    this.setState({ artists: res.data, loading: false })
  }

  render() {
    const { artists, loading } = this.state
    const { classes, openDialog } = this.props

    if (loading) {
      return <CircularProgress />
    }

    return (
      <React.Fragment>
        <div className={classes.title}>
          <div className={classes.titleText}>
            <Typography variant="h2">Artists</Typography>
          </div>
          <Button
            size="small"
            title="New"
            variant="contained"
            responsive
            onClick={() => openDialog(true)}
            icon={NewIcon}
          />
        </div>
        
        {!artists.length && <div>No artists found.</div>}
        <List component="nav">
          {artists.map(artist => {
            return (
              <ListItemLink key={artist.id} href="#simple-list">
                <Avatar>{artist.name && artist.name[0]}</Avatar>
                <ListItemText primary={artist.name} />
                <ListItemSecondaryAction>
                  <Button
                    size="small"
                    title="Edit"
                    variant=""
                    responsive
                    onClick={() => console.log("Edit")}
                    icon={EditIcon}
                  />
                  <Button
                    size="small"
                    title="Delete"
                    responsive
                    onClick={() => console.log("Delete")}
                    icon={DeleteIcon}
                  />
                </ListItemSecondaryAction>
              </ListItemLink>
            )
          })}
        </List>
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = ({ ui }, props) => {
  return {
    open: ui.dialog.open
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    openDialog: edit => dispatch(openDialog('artists', edit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(ListStyles)(ArtistsList)
)
