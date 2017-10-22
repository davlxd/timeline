import React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer } from 'react-konva'

import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { grey400 } from 'material-ui/styles/colors'

import EditPanel from '../EditPanel'
import AxisArrow from '../AxisArrow'
import TextBox from '../TextBox'

import { PIXELS_PER_SCALE } from '../../constants'
import { ZOOM_IN, ZOOM_OUT } from '../../actions'

import './style.css'

const iconStyles = {
  fill: grey400,
}
const zoomIn = {
  position: 'absolute',
  right: 5,
  bottom: 120
}
const zoomOut = {
  position: 'absolute',
  right: 5,
  bottom: 90
}

let Board = ({ textBoxList, onZoomInClick, onZoomOutClick }) => {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <AxisArrow />
          {
            textBoxList.map(textBox =>
              <TextBox
                key={textBox.id}
                {...textBox}
              />
            )
          }
        </Layer>
      </Stage>
      <EditPanel />
      <div className="ZoomButtonGroup">
        <IconButton iconStyle={iconStyles} style={zoomIn} onClick={onZoomInClick}>
          <ContentAdd />
        </IconButton>
        <IconButton iconStyle={iconStyles} style={zoomOut} onClick={onZoomOutClick}>
          <ContentRemove />
        </IconButton>
      </div>
    </div>
  )
}


const getTextBoxList = (state) => (
  state.data.events
  .filter(event => event.type === 'textbox')
  .map((event) => ({
    ...event,
    midPoint: window.innerWidth / 2 + ((event.when - state.data.axisArrow.centralTime) / state.data.axisArrow.scale) * PIXELS_PER_SCALE
  }))
)

const mapStateToProps = (state) => ({
  textBoxList: getTextBoxList(state)
})

const mapDispatchToProps = (dispatch) => ({
  onZoomInClick: () => {
    dispatch(ZOOM_IN)
  },
  onZoomOutClick: () => {
    dispatch(ZOOM_OUT)
  }
})

Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)


export default Board
