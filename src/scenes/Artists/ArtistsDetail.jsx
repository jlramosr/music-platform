import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import NewIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from 'components/Button/Button.jsx'
import { openDialog } from 'store/actions/ui'
import api from 'api/config'
import DetailStyles from 'assets/jss/detailStyles.jsx'


class ArtistsDetail extends React.Component {
  state = {
    artist: null,
    genres: [],
    loading: true
  }

  onClickEdit = itemId => {
    this.props.openDialog({
      edit: true,
      itemId
    })
  }

  onClickDelete = itemId  => {
    this.props.openDialog({
      edit: false
    })
  }

  async componentDidMount() {
    const { match: { params } } = this.props
    try {
      const res = await api.get(`/artists/${params.id}`)
      this.setState({ artist: res.data })
      const genreIds = res.data.genres
      const genresPromises = genreIds.map(genreId => {
        return api.get(`/genres/${genreId}`)
      })
      const [...genresRes] = await Promise.all(genresPromises)
      const genres = genresRes.map(res => res.data.name)
      this.setState({ genres, loading: false })
    } catch {
      this.setState({ loading: false })
    }
  }

  render() {
    const { artist, genres, loading } = this.state
    const { classes, width, match: { params } } = this.props

    if (!artist && !loading) {
      return (<div style={{padding: 8}}>Artist not found.</div>)
    }

    if (loading) {
      return <CircularProgress />
    }

    return (
      <React.Fragment>
        <div className={classes.header}>
          <div className={classes.title}>
            <div className={classes.titleText}>
              {artist.name}
            </div> 
          </div>
          <Button
            size="small"
            title="Edit"
            variant="contained"
            responsive
            onClick={() => this.onClickEdit(artist.id)}
            icon={EditIcon}
          />
          <Button
            size="small"
            title="Delete"
            variant="contained"
            responsive
            onClick={() => this.onClickDelete(artist.id)}
            icon={DeleteIcon}
          />
        </div>
        <Divider />
        <div className={classes.content}>
          <Paper>
            <div className={classes.paperContent}>
              {artist.img ?
                <Avatar className={classes.avatar} src={artist.img}></Avatar> :
                <Avatar className={classes.avatar}>{artist.name && artist.name[0]}</Avatar>
              }
              <div className={classes.genres}>
                {genres.map(genre => <Chip key={genre} className={classes.chip} label={genre} />)}
              </div>
            </div>
          </Paper>
        </div>
          
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ ui }, props) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withWidth()(
    withRouter(
      withStyles(DetailStyles)(ArtistsDetail)
    )
  )
)
