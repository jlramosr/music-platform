import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import NewIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Button from 'components/Button/Button.jsx'
import api from 'api/config'
import GenresStyles from 'assets/jss/genresStyles.jsx'
import uuidv4 from 'uuid/v4'

class Genres extends React.Component {
  state = {
    genres: [],
    genreEditableName: '',
    genreEditableId: null,
    isNew: false,
    loading: true
  }

  async getGenres() {
    try {
      const res = await api.get('/genres')
      this.setState({ genres: res.data, loading: false })
    } catch {
      this.setState({ loading: false })
    }
  }

  onFieldChange = event => {
    this.setState({ genreEditableName: event.target.value })
  }

  onClickNew = () => {
    this.setState(previousState => ({
      genres: [...previousState.genres, { id: '0', name: '' }],
      genreEditableName: '',
      genreEditableId: '0',
      isNew: true
    }))
  }

  onClickEdit = (itemId, itemName) => {
    this.setState({ genreEditableName: itemName, genreEditableId: itemId })
  }

  onClickSave = async itemId => {
    const { genreEditableName, isNew } = this.state
    try {
      if (isNew) {
        await api.post('/genres', {
          id: uuidv4(),
          name: genreEditableName
        })
      } else {
        await api.put(`/genres/${itemId}`, {
          name: genreEditableName
        })
      }
      this.setState({ genreEditableName: '', genreEditableId: null, isNew: false })
    } catch (e) {
      console.error('Error', e)
      this.setState({ genreEditableName: '', genreEditableId: null, isNew: false })
    }
  }

  onClickClose = () => {
    this.setState({ genreEditableName: '', genreEditableId: null, isNew: false })
  }

  onClickDelete = async itemId  => {
    try {
      await api.delete(`/genres/${itemId}`)
      this.getGenres()
    } catch (e) {
      console.error('Error', e)
    }
  }

  componentDidMount() {
    this.getGenres()
  }

  componentDidUpdate(prevProps, prevState) {
    const { genreEditableId } = this.state
    if (genreEditableId !== prevState.genreEditableId) {
      this.getGenres()
    }
  }

  render() {
    const { genreEditableId, genres, loading } = this.state
    const { classes } = this.props

    return (
      <React.Fragment>
        <div className={classes.header}>
          <div className={classes.title}>
            <Typography variant="h4">Genres</Typography>
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
        
        {!genres.length && !loading && <div style={{ padding: 8 }}>No genres found.</div>}
        <div className={classes.content}>
          <Grid container spacing={24}>
            {genres.map(genre => {
              return (
                <Grid key={genre.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Paper className={classes.paper}>
                    <div className={classes.itemName}>
                      {genre.id === genreEditableId ? (
                        <TextField value={this.state.genreEditableName} onChange={this.onFieldChange} />
                      ) : (
                        <Typography variant="overline">{genre.name}</Typography>
                      )}
                      
                    </div>
                    <div className={classes.itemActions}>
                      {genre.id === genreEditableId ? (
                        <React.Fragment>
                          <IconButton
                            aria-label="Save"
                            color="primary"
                            onClick={() => this.onClickSave(genre.id)}
                          >
                            <SaveIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            aria-label="Close"
                            color="primary"
                            onClick={this.onClickClose}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <IconButton
                            disabled={Boolean(genreEditableId)}
                            aria-label="Edit"
                            color="primary"
                            onClick={() => this.onClickEdit(genre.id, genre.name)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            disabled={Boolean(genreEditableId)}
                            aria-label="Delete"
                            color="primary"
                            onClick={() => this.onClickDelete(genre.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </div>
                  
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </React.Fragment>
      
    )
  }
}

export default withStyles(GenresStyles)(Genres)
