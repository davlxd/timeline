import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { CLOSE_SHARE_DIALOG } from '../../actions'

let ShareDialog = ({ show, editId, viewId, onShareDialogClose }) => {
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
        {editId ? (
          <p className="X">You can share this timeline with <tt>editor link</tt> or <tt>viewer link</tt>: </p>
        ) : (
          <p className="X">You can share this timeline with <tt>viewer link</tt>: </p>
        )}

        <p>
          {editId &&
            <div><tt>editor link: <a href={"https://timeline.ink/line/" + editId}>https://timeline.ink/line/{editId}</a></tt><br /></div>
          }
          <tt>viewer link: <a href={"https://timeline.ink/view/" + viewId}>https://timeline.ink/line/{viewId}</a></tt>
        </p>

        {editId ? (
          <p><b>Please keep the timeline links safe!</b> Anyone with <tt>viewer link</tt> is able to access this timeline, anyone with <tt>editor link</tt> is able to alter the timeline.</p>
        ) : (
          <p><b>Please keep the timeline links safe!</b> Anyone with <tt>viewer link</tt> is able to access this timeline.</p>
        )}

      </Dialog>
  )
}

const mapStateToProps = (state) => ({
  show: state.ui.shareDialog.show,
  editId: state.ui.editId,
  viewId: state.ui.viewId
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
