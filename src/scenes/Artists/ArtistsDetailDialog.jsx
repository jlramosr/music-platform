import React from 'react'
import { connect } from 'react-redux'
import { closeDialog } from 'store/actions/ui'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import api from 'api/config'
import Menu from 'components/Menu/Menu.jsx'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ArtistsDetailDialog extends React.Component {
  state = {
    open: false,
    artistName: '',
    artist: {
      name: '',
      genres: [],
      img: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      return { open: nextProps.open }
    }
    return null
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return nextProps.open !== nextState.open
  }*/

  async componentDidUpdate(prevProps, prevState) {
    console.log('state.artistName', prevState.artistName, this.state.artistName)
    console.log('props.itemId', prevProps.itemId, this.props.itemId)
    console.log('state.open', prevState.open, this.state.open)
    console.log('props.open', prevProps.open, this.props.open)
    try {
      const res = await api.get(`/artists/${this.props.itemId}`)
      const { name, img } = res.data
      this.setState({ artistName: name})
      /*const genreIds = res.data.genres
      const genresPromises = genreIds.map(genreId => {
        return api.get(`/genres/${genreId}`)
      })
      const [...genresRes] = await Promise.all(genresPromises)
      const genres = genresRes.map(res => res.data.name)
      this.setState({ artist: { name, genres, img } })*/
    } catch {
      console.log("MAL")
    }
  }

  handleClose = () => {
    this.props.closeDialog()
  }

  render() {
    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="fixed" color="default">
          <Toolbar>
            <div>
              {this.state.artistName}
            </div>
          </Toolbar>
        </AppBar>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ ui }, props) => {
  const { dialog: { itemId, open } } = ui
  return { itemId, open }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    closeDialog: () => dispatch(closeDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsDetailDialog)
