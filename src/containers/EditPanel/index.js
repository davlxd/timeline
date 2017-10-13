import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'

import AxisArrowEditor from '../AxisArrowEditor'
import TextBoxEditor from '../TextBoxEditor'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let EditPanel = ({ isOpen, type, onRequestClose }) => (
  <div >
    <Drawer
      docked={false}
      width='38.2%'
      openSecondary={true}
      open={isOpen}
      onRequestChange={onRequestClose}
      >
        {(() => {
          if (type === 'axisarrow') {
            return <AxisArrowEditor />
          } else if (type === 'textbox') {
            return <TextBoxEditor />
          }
        })()}
    </Drawer>
  </div>
)

const mapStateToProps = (state) => ({
  isOpen: state.ui.editPanelOpen,
  type: state.ui.editPanelOpen ? state.data.events.filter(event => event.id === state.ui.eventIdOnEditPanel)[0].type : ''
})

const mapDispatchToProps = (dispatch) => ({
  onRequestClose: () => {
    dispatch(TOGGLE_EDIT_PANEL())
  }
})

EditPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel)



export default EditPanel
