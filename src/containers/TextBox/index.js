import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors'

import { TOGGLE_EDIT_PANEL, UPDATE_TEXT_BOX_HEIGHT, INCIDENT_DRAGGED } from '../../actions'

import { dataToKanvaAttrForTextBox, konvaAttrToDataForTextBox } from './positionCalculator'

import DateTimeMarkerOnAxisArrow from '../DateTimeMarkerOnAxisArrow'

import './style.css'

class TextBox extends Component {
  constructor(props) {
    super(props)
    const { when, aboveLine } = props
    this.state = {
      showTime: false,
      when,
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
    const { when, distance, aboveLine } = konvaAttrToDataForTextBox(x, y, width, height, scale, centralTime)
    const { cordLinePoints } = dataToKanvaAttrForTextBox({
      ...this.props,
      when,
      distance,
      aboveLine
    })

    this.setState({
      when,
      aboveLine
    }) // Has to call setState first, don't know why

    this.canvasText.x(x)
    this.canvasText.y(y)
    this.canvasRect.x(x)
    this.canvasRect.y(y)
    this.canvasRectBackdrop.x(x)
    this.canvasRectBackdrop.y(y)
    this.cord.points(cordLinePoints)
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
    const { text, width, fontSize, height, displayBorder, borderWidth, attachCord } = this.props
    const { x, y, cordLinePoints} = dataToKanvaAttrForTextBox(this.props)

    return (
      <Group>
        <Rect
          x={x}
          y={y}
          fill='#ffffff'
          width={width}
          height={height}
          cornerRadius={5}
          ref={(rect) => {this.canvasRectBackdrop = rect}}
        />
        <Text
          x={x}
          y={y}
          text={text}
          fontSize={fontSize}
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
          strokeEnabled={displayBorder}
          strokeWidth={borderWidth}
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
          visible={attachCord}
          points={cordLinePoints}
          stroke={grey800}
          strokeWidth={0.5}
          ref={(line) => {this.cord = line}}
        />
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.when}
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
  contextMenuEventTimestamp: state.ui.contextMenu.eventTimestamp
})

TextBox = connect(
  mapStateToProps,
  null
)(TextBox)

export default TextBox
