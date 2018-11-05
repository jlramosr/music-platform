import React from 'react'
import { connect } from 'react-redux'
import { closeDialog } from 'store/actions/ui'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ArtistsDetailDialog extends React.Component {

  handleClose = () => {
    this.props.closeDialog()
  }

  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        hola
      </Dialog>
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
    closeDialog: () => dispatch(closeDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsDetailDialog)
