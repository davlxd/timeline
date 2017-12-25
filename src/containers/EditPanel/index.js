import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'

import AxisArrowEditor from '../AxisArrowEditor'
import TextBoxEditor from '../TextBoxEditor'
import RangeEditor from '../RangeEditor'
import MilestoneEditor from '../MilestoneEditor'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let EditPanel = ({ isOpen, type, onRequestClose, openFromRight }) => (
  <div >
    <Drawer
      docked={false}
      width='38.2%'
      openSecondary={openFromRight}
      open={isOpen}
      onRequestChange={onRequestClose(openFromRight)}
      >
        {(() => {
          if (type === 'axisarrow') {
            return <AxisArrowEditor />
          } else if (type === 'textbox') {
            return <TextBoxEditor />
          } else if (type === 'range') {
            return <RangeEditor />
          } else if (type === 'milestone') {
            return <MilestoneEditor />
          }
        })()}
    </Drawer>
  </div>
)

const mapStateToProps = (state) => ({
  isOpen: state.ui.editPanel.open,
  type: state.ui.editPanel.incidentType,
  openFromRight: state.ui.editPanel.openFromRight
})

const mapDispatchToProps = (dispatch) => ({
  onRequestClose: (openFromRight) => (
    () => dispatch(TOGGLE_EDIT_PANEL('', 0, openFromRight))
  )
})

EditPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel)



export default EditPanel
