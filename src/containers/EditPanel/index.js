import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'

import AxisArrowEditor from '../AxisArrowEditor'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let EditPanel = ({ isOpen, onRequestClose }) => (
  <div >
    <Drawer
      docked={false}
      width='38.2%'
      openSecondary={true}
      open={isOpen}
      onRequestChange={onRequestClose}
      >
      <AxisArrowEditor />
    </Drawer>
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
