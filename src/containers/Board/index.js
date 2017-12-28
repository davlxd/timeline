import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Rect, Line } from 'react-konva'

import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { grey400, grey500 } from 'material-ui/styles/colors'

import EditPanel from '../EditPanel'
import AxisArrow from '../AxisArrow'
import TextBox from '../TextBox'
import Range from '../Range'
import Milestone from '../Milestone'
import DateTimeMarkerOnAxisArrow from '../DateTimeMarkerOnAxisArrow'
import ContextMenu  from '../ContextMenu'

import { PIXELS_PER_SCALE } from '../../constants'
import { ZOOM_IN, ZOOM_OUT, STAGE_BEING_DRAGGED, SHOW_CONTEXT_MENU, CLOSE_CONTEXT_MENU_IF_ANY } from '../../actions'

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
  constructor(props) {
    super(props)
    this.state = {
      showTime: false,
      prevCanvasStageDragCaptureX: 0,
    }
  }

  onDragMoveLessFancy() {
  }

  onDragMoveFancy() {
    console.log(this.canvasStageDragCapture.x())
    const currentCanvasStageDragCaptureX = this.canvasStageDragCapture.x()
    const centralTimeOffset = - ((currentCanvasStageDragCaptureX - this.state.prevCanvasStageDragCaptureX) * this.props.scale) / (PIXELS_PER_SCALE)
    this.props.onStageBeingDragged(this.props.centralTime + centralTimeOffset)

    this.setState({
      showTime: true,
      prevCanvasStageDragCaptureX: currentCanvasStageDragCaptureX
    })
  }

  onDragMove() {
    this.onDragMoveFancy()
  }

  onDragEndLessFancy() {
    const currentCanvasStageDragCaptureX = this.canvasStageDragCapture.x()
    console.log(this.canvasStageDragCapture.x())
    const centralTimeOffset = - ((currentCanvasStageDragCaptureX - 0) * this.props.scale) / (PIXELS_PER_SCALE)
    this.props.onStageBeingDragged(this.props.centralTime + centralTimeOffset)
  }


  onDragEndFancy() {
    this.canvasStageDragCapture.x(0)
    this.canvasStageDragCapture.y(0)
    this.setState({
      showTime: false,
      prevCanvasStageDragCaptureX: 0
    })
  }

  onDragEnd() {
    this.onDragEndFancy()
  }

  onContentContextmenu(e) {
    const { editable } = this.props
    if (!editable) {
      return;
    }
    this.props.openContextMenu(e.evt.clientX, e.evt.clientY, e.evt.timeStamp)
    e.evt.stopPropagation()
    e.evt.stopImmediatePropagation()
    e.evt.preventDefault()
  }

  onClickOnStage(e) {
    if (Math.abs(e.evt.timeStamp - this.props.contextMenuEventTimestamp) < 500) return;
    this.props.closeContextMenuIfAny()
  }

  render() {
    const { centralTime, incidentList, onZoomInClick, onZoomOutClick } = this.props
    return (
      <div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onContentContextmenu={this.onContentContextmenu.bind(this)}
          onClick={this.onClickOnStage.bind(this)}
          >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              draggable={true}
              ref={(rect) => {this.canvasStageDragCapture = rect}}
              onDragMove={this.onDragMove.bind(this)}
              onDragEnd={this.onDragEnd.bind(this)}
            />
            <Line
              visible={this.state.showTime}
              points={[window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight]}
              stroke={grey500}
              strokeWidth={0.5}
              ref={(line) => {this.canvasLine = line}}
            />
            <AxisArrow />
            <DateTimeMarkerOnAxisArrow
              visible={this.state.showTime}
              when={centralTime}
              midPoint={window.innerWidth / 2}
              aboveLine={true}
            />
            {
              incidentList.map(incident => {
                if (incident.type === 'textbox') {
                  return <TextBox
                    key={incident.id}
                    {...incident}
                  />
                } else if (incident.type === 'range') {
                  return <Range
                    key={incident.id}
                    {...incident}
                  />
                } else if (incident.type === 'milestone') {
                  return <Milestone
                    key={incident.id}
                    {...incident}
                  />
                }
                return <Stage />;
              })
            }

            <ContextMenu />
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

const mapStateToProps = (state) => ({
  incidentList: state.data.incidents,
  centralTime: state.data.axisArrow.centralTime,
  scale: state.data.axisArrow.scale,
  editable: state.ui.editable,
  contextMenuEventTimestamp: state.ui.contextMenu.eventTimestamp
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
  },
  openContextMenu: (mouseX, mouseY, eventTimestamp) => {
    dispatch(SHOW_CONTEXT_MENU(mouseX, mouseY, eventTimestamp))
  },
  closeContextMenuIfAny: () => {
    dispatch(CLOSE_CONTEXT_MENU_IF_ANY)
  }
})

Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)


export default Board
