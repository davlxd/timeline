import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { CLOSE_FORK_DIALOG } from '../../actions'

let ForkDialog = ({ show, onForkDialogClose }) => {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={onForkDialogClose}
      />,
      <FlatButton
        label="Create"
        primary={true}
        onClick={onForkDialogClose}
      />
    ]
  return (
    <Dialog
      title="You are creating a new timeline"
      actions={actions}
      modal={false}
      open={show}
      onRequestClose={onForkDialogClose}
      >
        Please read our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>. By clicking on <b>CREATE</b>, you accept our Terms of Service.
      </Dialog>
  )
}

const mapStateToProps = (state) => ({
  show: state.ui.forkDialog.show
})

const mapDispatchToProps = (dispatch) => ({
  onForkDialogClose: () => {
    dispatch(CLOSE_FORK_DIALOG)
  }
})

ForkDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForkDialog)


export default ForkDialog
