import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { CLOSE_SHARE_DIALOG } from '../../actions'

let ShareDialog = ({ show, onShareDialogClose }) => {
  const actions = [
      <FlatButton
        label="I understand"
        primary={true}
        onClick={onShareDialogClose}
      />
    ]
  return (
    <Dialog
      title="Share your timeline"
      actions={actions}
      modal={true}
      open={show}
      onRequestClose={onShareDialogClose}
      >
        <p className="X">You can share this timeline with editor link or viewer link: </p>
        <p><tt>
          editor link: <a href="https://timeline.ink/line/5384ff46e950491993b88aba3286fda8">https://timeline.ink/line/5384ff46e950491993b88aba3286fda8</a>
        <br/>
        viewer link: <a href="https://timeline.ink/line/5384ff46e950491993b88aba3286fda8">https://timeline.ink/line/5384ff46e950491993b88aba3286fda8</a>
        </tt></p>

        <p><b>Please keep the timeline links safe!</b> Anyone with <tt>viewer link</tt> is able to access this timeline, anyone with <tt>editor link</tt> is able to alter the timeline.</p>
      </Dialog>
  )
}

const mapStateToProps = (state) => ({
  show: state.ui.shareDialog.show
})

const mapDispatchToProps = (dispatch) => ({
  onShareDialogClose: () => {
    dispatch(CLOSE_SHARE_DIALOG)
  }
})

ShareDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareDialog)


export default ShareDialog
