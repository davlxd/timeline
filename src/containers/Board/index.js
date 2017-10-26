import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect } from 'react-konva'

import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { grey400 } from 'material-ui/styles/colors'

import EditPanel from '../EditPanel'
import AxisArrow from '../AxisArrow'
import TextBox from '../TextBox'

import { PIXELS_PER_SCALE } from '../../constants'

import { ZOOM_IN, ZOOM_OUT, STAGE_BEING_DRAGGED } from '../../actions'

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



class Board extends Component {
  onDragMove() {
    console.log(this.canvasStageDragCapture.x())
    console.log(this.canvasStageDragCapture.y())
    const centralTimeOffset = - (this.canvasStageDragCapture.x() * this.props.scale) / (PIXELS_PER_SCALE * 3)
    this.props.onStageBeingDragged(this.props.centralTime + centralTimeOffset)
  }

  onDragEnd() {
    this.canvasStageDragCapture.x(0)
    this.canvasStageDragCapture.y(0)
  }

  render() {
    const { textBoxList, onZoomInClick, onZoomOutClick } = this.props
    return (
      <div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          >
          <Layer>
            <Rect
              x={0}
              y={0}
              // stroke='#000000'
              // strokeWidth={2}
              width={window.innerWidth}
              height={window.innerHeight}
              draggable={true}
              ref={(rect) => {this.canvasStageDragCapture = rect}}
              onDragMove={this.onDragMove.bind(this)}
              onDragEnd={this.onDragEnd.bind(this)}
            />
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
}


const getTextBoxList = (state) => (
  state.data.events.filter(event => event.type === 'textbox')
)

const mapStateToProps = (state) => ({
  textBoxList: getTextBoxList(state),
  centralTime: state.data.axisArrow.centralTime,
  scale: state.data.axisArrow.scale
})

const mapDispatchToProps = (dispatch) => ({
  onZoomInClick: () => {
    dispatch(ZOOM_IN)
  },
  onZoomOutClick: () => {
    dispatch(ZOOM_OUT)
  },
  onStageBeingDragged: (newCentralTime) => {
    dispatch(STAGE_BEING_DRAGGED(newCentralTime))
  }
})

Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)


export default Board
