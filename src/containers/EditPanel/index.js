import React from 'react'
import { connect } from 'react-redux'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let EditPanel = ({ isOpen, onRequestClose }) => (
  <div >
    <SlidingPane
      className="some-custom-class"
      overlayClassName='SlidePaneOverlay'
      isOpen={ isOpen }
      title='Hey, it is optional pane title.  I can be React component too.'
      subtitle='Optional subtitle.'
      width='38.2%'
      onRequestClose={ onRequestClose }
      >
        <div>And I am pane content. BTW, what rocks?</div>
        <br />
    </SlidingPane>
  </div>
)

const mapStateToProps = (state) => ({
  isOpen: state.ui.editPanelOpen
})

const mapDispatchToProps = (dispatch) => ({
  onRequestClose: () => {
    dispatch(TOGGLE_EDIT_PANEL)
  }
})

EditPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel)



export default EditPanel
