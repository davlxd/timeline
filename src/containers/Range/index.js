import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey400, grey800 } from 'material-ui/styles/colors'
import { Group, Rect, Text, Line } from 'react-konva'

import { INCIDENT_DRAGGED, TOGGLE_EDIT_PANEL } from '../../actions'

import { timestampToX } from '../../utils'
import { dataToKanvaAttrForRange, konvaAttrToDataForRange, konvaAttrToDataAvoidAxisArrowForRange } from './positionCalculator'

import DateTimeMarkerOnAxisArrow from '../DateTimeMarkerOnAxisArrow'

export const RANGE_HEIGHT = 30
export const RANGE_BOUNDARY_WIDTH = 3

class Range extends Component {
  constructor(props) {
    super(props)
    const { start, end, aboveLine, scale, centralTime } = props
    this.state = {
      showTime: false,
      start,
      end,
      startX: timestampToX(start, scale, centralTime),
      endX: timestampToX(end, scale, centralTime),
      aboveLine
    }
  }

  onClick(e) {
    const { type, id } = this.props
    if (Math.abs(e.evt.timeStamp - this.props.contextMenuEventTimestamp) < 500) return;
    this.props.dispatch(TOGGLE_EDIT_PANEL(type, id))
  }

  repositionCanvasTextBackground() {
    this.canvasTextBackground.x(this.canvasRect.x() + (this.canvasRect.width() - this.canvasText.getTextWidth()) / 2)
    this.canvasTextBackground.y(this.canvasRect.y() + (this.canvasRect.height() - this.canvasText.getTextHeight()) / 2)
    this.canvasTextBackground.width(this.canvasText.getTextWidth())
    this.canvasTextBackground.height(this.canvasText.getTextHeight())
  }

  componentDidMount() {
    this.repositionCanvasTextBackground()
  }

  componentDidUpdate(props) {
    this.repositionCanvasTextBackground()
  }

  onRectDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { x, y } = { x: this.canvasRect.x(), y: this.canvasRect.y() }
    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(x, y, this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    const { startCordLinePoints, endCordLinePoints, backgroundLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.setState({
      showTime: true,
      start: newPropsCalcFromKonvaAttr.start,
      end: newPropsCalcFromKonvaAttr.end,
      startX: this.canvasRect.x(),
      endX: this.canvasRect.x() + this.canvasRect.width(),
      aboveLine: newPropsCalcFromKonvaAttr.aboveLine
    })

    this.canvasRect.x(x)
    this.canvasRect.y(y)
    this.canvasText.x(x)
    this.canvasText.y(y)
    this.repositionCanvasTextBackground()
    this.backgroundLine.points(backgroundLinePoints)
    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
    this.startBoundary.x(this.canvasRect.x() - RANGE_BOUNDARY_WIDTH / 2)
    this.startBoundary.y(this.canvasRect.y())
    this.endBoundary.x(this.canvasRect.x() + this.canvasRect.width() - RANGE_BOUNDARY_WIDTH / 2)
    this.endBoundary.y(this.canvasRect.y())
  }

  onRectDragEnd() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { start, end, distance, aboveLine } = konvaAttrToDataAvoidAxisArrowForRange(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  onBoundaryDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props

    const startBoundaryX = this.startBoundary.x() > this.endBoundary.x() ? this.endBoundary.x() : this.startBoundary.x()
    const endBoundaryX = this.startBoundary.x() > this.endBoundary.x() ? this.startBoundary.x() : this.endBoundary.x()
    const rectWidth = endBoundaryX - startBoundaryX

    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(startBoundaryX + RANGE_BOUNDARY_WIDTH / 2, this.canvasRect.y(), rectWidth, RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)

    const { startCordLinePoints, endCordLinePoints, backgroundLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.setState({
      showTime: true,
      start: newPropsCalcFromKonvaAttr.start,
      end: newPropsCalcFromKonvaAttr.end,
      startX: startBoundaryX + RANGE_BOUNDARY_WIDTH / 2,
      endX: endBoundaryX + RANGE_BOUNDARY_WIDTH / 2
    })

    this.canvasRect.x(startBoundaryX + RANGE_BOUNDARY_WIDTH / 2)
    this.canvasRect.width(rectWidth)
    this.canvasText.x(startBoundaryX + RANGE_BOUNDARY_WIDTH / 2)
    this.canvasText.width(rectWidth)
    this.repositionCanvasTextBackground()
    this.backgroundLine.points(backgroundLinePoints)
    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
    this.startBoundary.x(startBoundaryX)
    this.endBoundary.x(endBoundaryX)
  }

  onBoundaryDragEnd() {
    const { scale, centralTime, axisArrowLineWidth } = this.props

    const startBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.endBoundary : this.startBoundary
    const endBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.startBoundary : this.endBoundary
    const rectWidth = endBoundary.x() - startBoundary.x()

    const { start, end, distance, aboveLine } = konvaAttrToDataAvoidAxisArrowForRange(startBoundary.x() + RANGE_BOUNDARY_WIDTH / 2, this.canvasRect.y(), rectWidth, RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  onMouseOver() {
    this.onRectDragMove()
    this.setState({
      showTime: true
    })
    this.repositionCanvasTextBackground()
  }

  onMouseOut() {
    this.setState({
      showTime: false
    })
    this.repositionCanvasTextBackground()
  }

  render() {
    const { text } = this.props
    const { rectX, rectY, rectWidth, startCordLinePoints, endCordLinePoints, backgroundLinePoints } = dataToKanvaAttrForRange(this.props)

    return (
      <Group>
        <Line
          points={backgroundLinePoints}
          stroke={grey400}
          strokeWidth={0.5}
          ref={(line) => {this.backgroundLine = line}}
        />
        <Rect
          x={rectX}
          y={rectY}
          width={rectWidth}
          height={RANGE_HEIGHT}
          cornerRadius={4}
          fill='#ffffff'
          draggable={true}
          ref={(rect) => {this.canvasTextBackground = rect}}
        />
        <Text
          x={rectX}
          y={rectY}
          text={text}
          fontSize={18}
          fontFamily='Calibri'
          fill='#555'
          width={rectWidth}
          height={RANGE_HEIGHT}
          padding={4}
          align='center'
          ref={(text) => {this.canvasText = text}}
        />
        <Rect
          x={rectX}
          y={rectY}
          // stroke={grey300}
          // strokeWidth={0.5}
          width={rectWidth}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          // fill={grey300}
          draggable={true}
          ref={(rect) => {this.canvasRect = rect}}
          onDragMove={this.onRectDragMove.bind(this)}
          onDragEnd={this.onRectDragEnd.bind(this)}
          onClick={this.onClick.bind(this)}
          onTap={this.onClick.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Rect
          x={rectX - RANGE_BOUNDARY_WIDTH / 2}
          y={rectY}
          stroke={grey800}
          strokeWidth={RANGE_BOUNDARY_WIDTH / 2}
          width={RANGE_BOUNDARY_WIDTH}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fill={grey800}
          draggable={true}
          ref={(rect) => {this.startBoundary = rect}}
          onDragMove={this.onBoundaryDragMove.bind(this)}
          onDragEnd={this.onBoundaryDragEnd.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Rect
          x={rectX + rectWidth - RANGE_BOUNDARY_WIDTH / 2}
          y={rectY}
          stroke={grey800}
          strokeWidth={RANGE_BOUNDARY_WIDTH / 2}
          width={RANGE_BOUNDARY_WIDTH}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fill={grey800}
          draggable={true}
          ref={(rect) => {this.endBoundary = rect}}
          onDragMove={this.onBoundaryDragMove.bind(this)}
          onDragEnd={this.onBoundaryDragEnd.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Line
          points={startCordLinePoints}
          stroke={grey400}
          strokeWidth={0.5}
          ref={(line) => {this.startCord = line}}
        />
        <Line
          points={endCordLinePoints}
          stroke={grey400}
          strokeWidth={0.5}
          ref={(line) => {this.endCord = line}}
        />
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.start}
          midPoint={this.state.startX}
          aboveLine={!this.state.aboveLine}
        />
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.end}
          midPoint={this.state.endX}
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
})

Range = connect(
  mapStateToProps,
  null
)(Range)
export default Range
