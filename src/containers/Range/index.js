import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey300, grey400, grey800 } from 'material-ui/styles/colors'
import { Group, Rect, Line } from 'react-konva'

import { INCIDENT_DRAGGED } from '../../actions'

import { dataToKanvaAttrForRange, konvaAttrToDataForRange, konvaAttrToDataAvoidAxisArrowForRange } from './positionCalculator'

export const RANGE_HEIGHT = 30
export const RANGE_BOUNDARY_WIDTH = 3

class Range extends Component {
  onRectDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    const { startCordLinePoints, endCordLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

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

    const startBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.endBoundary : this.startBoundary
    const endBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.startBoundary : this.endBoundary
    const rectWidth = endBoundary.x() - startBoundary.x()

    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(startBoundary.x() + RANGE_BOUNDARY_WIDTH / 2, this.canvasRect.y(), rectWidth, RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)

    const { startCordLinePoints, endCordLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.canvasRect.x(startBoundary.x())
    this.canvasRect.width(rectWidth)
    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
  }

  onBoundaryDragEnd() {
    const { scale, centralTime, axisArrowLineWidth } = this.props

    const startBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.endBoundary : this.startBoundary
    const endBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.startBoundary : this.endBoundary
    const rectWidth = endBoundary.x() - startBoundary.x()

    const { start, end, distance, aboveLine } = konvaAttrToDataAvoidAxisArrowForRange(startBoundary.x() + RANGE_BOUNDARY_WIDTH / 2, this.canvasRect.y(), rectWidth, RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  render() {
    const { rectX, rectY, rectWidth, startCordLinePoints, endCordLinePoints } = dataToKanvaAttrForRange(this.props)

    return (
      <Group>
        <Rect
          x={rectX}
          y={rectY}
          stroke={grey300}
          strokeWidth={0.5}
          width={rectWidth}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fill={grey300}
          draggable={true}
          ref={(rect) => {this.canvasRect = rect}}
          onDragMove={this.onRectDragMove.bind(this)}
          onDragEnd={this.onRectDragEnd.bind(this)}
          // onClick={this.onClick.bind(this)}
          // onTap={this.onClick.bind(this)}
          // onMouseOver={this.onMouseOver.bind(this)}
          // onMouseOut={this.onMouseOut.bind(this)}
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
