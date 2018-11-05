import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
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
      <Link to={props.to}>
        <ListItem button {...props}/>
      </Link>
    </React.Fragment>
  )
}

class ArtistsList extends React.Component {
  state = {
    artists: [],
    loading: true
  }

  onClickNew= () => {
    this.props.openDialog({
      edit: false
    })
  }

  onClickEdit = (event, itemId) => {
    event.preventDefault()
    this.props.openDialog({
      edit: true,
      itemId
    })
  }

  onClickDelete = (event, itemId)  => {
    event.preventDefault()
    this.props.openDialog({
      edit: false
    })
  }

  async componentDidMount() {
    try {
      const res = await api.get('/artists')
      this.setState({ artists: res.data, loading: false })
    } catch {
      this.setState({ loading: false })
    }
  }

  render() {
    const { artists, loading } = this.state
    const { classes, width } = this.props

    return (
      <React.Fragment>
        <div className={classes.header}>
          <div className={classes.title}>
            <Typography variant="h4">Artists</Typography>
            {loading && <CircularProgress className={classes.progress} />}
          </div>
          <Button
            size="small"
            title="New"
            variant="contained"
            responsive
            onClick={() => this.onClickNew()}
            icon={NewIcon}
          />
        </div>
        
        {!artists.length && !loading && <div>No artists found.</div>}
        <List dense={width === 'xs'}>
          {artists.map(artist => {
            return (
              <ListItemLink key={artist.id} to={`artists/${artist.id}`}>
                <div className={classes.itemTitle}>
                  {artist.img ?
                    <Avatar src={artist.img} /> :
                    <Avatar>{artist.name && artist.name[0]}</Avatar>
                  }
                  <ListItemText primary={artist.name} />
                </div>
                
                <div>
                  <IconButton
                    aria-label="Edit"
                    color="primary"
                    onClick={event => this.onClickEdit(event, artist.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    color="primary"
                    onClick={event => this.onClickDelete(event, artist.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </ListItemLink>
            )
          })}
        </List>
      </React.Fragment>
      
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    openDialog: ({ edit, itemId }) => dispatch(openDialog({
      category: 'artists',
      edit,
      itemId
    }))
  }
}

export default connect(null, mapDispatchToProps)(
  withWidth()(
    withStyles(ListStyles)(ArtistsList)
  )
)
