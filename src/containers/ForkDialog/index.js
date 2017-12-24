import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { FORK_LINE, CLOSE_FORK_DIALOG } from '../../actions'

let ForkDialog = ({ show, onForkLine, onForkDialogClose }) => {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={onForkDialogClose}
      />,
      <FlatButton
        label="Create"
        primary={true}
        onClick={onForkLine}
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
  show: state.ui.forkDialog.show,
  editId: state.ui.editId,
  viewId: state.ui.viewId
})

const mapDispatchToProps = (dispatch) => ({
  onForkDialogClose: () => {
    dispatch(CLOSE_FORK_DIALOG)
  },
  _onForkLine: (id) => {
    dispatch(FORK_LINE(id))
  }
})

ForkDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onForkLine: () => {
      dispatchProps._onForkLine(stateProps.editId ? stateProps.editId : stateProps.viewId)
    }
  })
)(ForkDialog)


export default ForkDialog
