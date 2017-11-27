import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors'

import { TOGGLE_EDIT_PANEL, UPDATE_TEXT_BOX_HEIGHT, INCIDENT_DRAGGED } from '../../actions'

import { dataToKanvaAttrForTextBox, konvaAttrToDataForTextBox } from './positionCalculator'
import { timestampToX } from '../../utils'

import DateTimeMarkerOnAxisArrow from '../DateTimeMarkerOnAxisArrow'

import './style.css'

class TextBox extends Component {
  constructor(props) {
    super(props)
    const { when, midPoint, aboveLine } = props
    this.state = {
      showTime: false,
      when,
      midPoint,
      aboveLine
    }
  }

  componentDidMount() {
    if (this.props.height !== this.canvasText.getHeight()) {
      this.props.dispatch(UPDATE_TEXT_BOX_HEIGHT(this.props.id, this.canvasText.getHeight()))
    }
  }

  componentDidUpdate(props) {
    if (props.height !== this.canvasText.getHeight()) {
      props.dispatch(UPDATE_TEXT_BOX_HEIGHT(props.id, this.canvasText.getHeight()))
    }
  }

  onClick(e) {
    const { type, id } = this.props
    if (Math.abs(e.evt.timeStamp - this.props.contextMenuEventTimestamp) < 500) return;
    this.props.dispatch(TOGGLE_EDIT_PANEL(type, id))
  }

  onDragMove() {
    const { width, height, scale, centralTime } = this.props
    const { x, y } = { x: this.canvasRect.x(), y: this.canvasRect.y() }
    const { distance, midPoint, aboveLine, when } = konvaAttrToDataForTextBox(x, y, width, height, scale, centralTime)
    const { linePoints } = dataToKanvaAttrForTextBox({ midPoint, width, height, distance, aboveLine })

    this.setState({
      when,
      midPoint,
      aboveLine
    }) // Has to call setState first, don't know why

    this.canvasText.x(x)
    this.canvasText.y(y)
    this.canvasRect.x(x)
    this.canvasRect.y(y)
    this.canvasLine.points(linePoints)
  }

  onDragEnd() {
    const { width, height, scale, centralTime } = this.props
    const { distance, when, aboveLine } = konvaAttrToDataForTextBox(this.canvasRect.x(), this.canvasRect.y(), width, height, scale, centralTime)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { distance: (distance < 20 ? 20 : distance), when, aboveLine }))
  }

  onMouseOver() {
    this.onDragMove()
    this.setState({
      showTime: true
    })
  }

  onMouseOut() {
    this.setState({
      showTime: false
    })
  }

  render() {
    const { text, width, height } = this.props
    const { x, y, linePoints} = dataToKanvaAttrForTextBox(this.props)

    return (
      <Group>
        <Text
          x={x}
          y={y}
          text={text}
          fontSize={18}
          fontFamily='Calibri'
          fill='#555'
          width={width}
          padding={10}
          align='center'
          ref={(text) => {this.canvasText = text}}
        />
        <Rect
          x={x}
          y={y}
          stroke={grey800}
          strokeWidth={2}
          width={width}
          height={height}
          shadowColor={grey800}
          shadowBlur={10}
          shadowOffset={[10, 10]}
          shadowOpacity={0.2}
          cornerRadius={5}
          draggable={true}
          ref={(rect) => {this.canvasRect = rect}}
          onDragMove={this.onDragMove.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
          onClick={this.onClick.bind(this)}
          onTap={this.onClick.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Line
          points={linePoints}
          stroke={grey800}
          ref={(line) => {this.canvasLine = line}}
        />
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.when}
          midPoint={this.state.midPoint}
          aboveLine={!this.state.aboveLine}
        />
      </Group>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  scale: state.data.axisArrow.scale,
  centralTime: state.data.axisArrow.centralTime,
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
  midPoint: timestampToX(ownProps.when, state.data.axisArrow.scale, state.data.axisArrow.centralTime),
  contextMenuEventTimestamp: state.ui.contextMenu.eventTimestamp
})

TextBox = connect(
  mapStateToProps,
  null
)(TextBox)

export default TextBox
