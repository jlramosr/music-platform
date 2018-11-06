import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Check'
import api from 'api/config'
import { closeDialog } from 'store/actions/ui'
import ArtistsDetailDialogStyles from 'assets/jss/artistsDetailDialogStyles.jsx'
import uuidv4 from 'uuid/v4'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ArtistsDetailDialog extends React.Component {
  state = {
    name: '',
    genres: [],
    allGenres: [],
    img: ''
  }

  finishDialog = operationSuccess => {
    this.setState({
      name: '',
      genres: [],
      allGenres: [],
      img: ''
    })
    this.props.closeDialog(operationSuccess)
  }

  onFieldChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  onRemoveGenre = genreName => {
    this.setState(previousState => ({ 
      genres: previousState.genres.filter(genre => genre !== genreName)
    }))
  }

  saveData = async () => {
    const { allGenres, genres, img, name } = this.state
    const { edit, itemId } = this.props
    const data = {
      name,
      genres: genres.map(name => allGenres.find(genre => genre.name === name).id),
      img
    }
    try {
      if (edit) {
        await api.put(`/artists/${itemId}`, data)
      } else {
        const id = uuidv4()
        await api.post('/artists', {...data, id} )
      }
      this.finishDialog(true)
    } catch (e) {
      console.error('Error', e)
      this.finishDialog(false)
    }
  }

  closeDialog = () => {
    this.finishDialog(false)
  }

  handleClose = () => {
    this.finishDialog(false)
  }
  
  async componentDidUpdate(prevProps) {
    if (this.props.open && this.props.open !== prevProps.open) {
      try {
        const genresRes = await api.get('/genres')
        const allGenres = genresRes.data
        if (this.props.edit) {
          const res = await api.get(`/artists/${this.props.itemId}`)
          const { genres, img, name  } = res.data
          const artistGenres = allGenres.reduce((acc, genre) =>
            genres.includes(genre.id) ? [...acc, genre.name] : acc, []
          )
          this.setState({ allGenres, genres: artistGenres, img, name })
        } else {
          this.setState({ allGenres })
        }
      } catch {
        this.props.closeDialog()
      }
    }
  }

  render() {
    const { allGenres, genres, img, name } = this.state
    const { category, classes, edit, open } = this.props
    return (
      <Dialog
        fullScreen
        open={open && category === 'artists'}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton color="inherit" aria-label="Close" onClick={this.closeDialog}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              { edit ? 'Edit artist' : 'New artist' }
            </Typography>
            <IconButton color="inherit" aria-label="Save" onClick={this.saveData}>
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.field}
            value={name}
            onChange={this.onFieldChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="img"
            label="Image URL"
            value={img}
            className={classes.field}
            onChange={this.onFieldChange('img')}
            margin="normal"
            variant="outlined"
          />
          <FormControl className={classes.field}>
            <InputLabel htmlFor="genres">Genres</InputLabel>
            <Select
              multiple
              value={genres}
              onChange={this.onFieldChange('genres')}
              input={<Input id="genres" />}
              renderValue={selected => {
                const genresSelected = selected.map(name => allGenres.find(genre => genre.name === name))
                return (
                  <div className={classes.chips}>
                    {genresSelected.map(genre => (
                      <Chip onDelete={() => this.onRemoveGenre(genre.name)} key={genre.id} label={genre.name} className={classes.chip} />
                    ))}
                  </div>
                )
              }}
            >
              {allGenres.filter(genre => !genres.includes(genre.name)).map(genre => (
                <MenuItem key={genre.id} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ ui }) => {
  const { dialog: { category, edit, itemId, open } } = ui
  return { category, edit, itemId, open }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: operationSuccess => dispatch(closeDialog(operationSuccess))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(ArtistsDetailDialogStyles)(ArtistsDetailDialog)
)
