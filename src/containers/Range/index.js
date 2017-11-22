import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey300, grey400, grey800 } from 'material-ui/styles/colors'
import { Group, Rect, Line } from 'react-konva'

import { INCIDENT_DRAGGED } from '../../actions'

import { dataToKanvaAttrForRange, konvaAttrToDataForRange, konvaAttrToDataAvoidAxisArrowForRange } from './positionCalculator'

export const RANGE_HEIGHT = 30

class Range extends Component {
  onRectDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    const { startCordLinePoints, endCordLinePoints, startBoundaryLinePoints, endBoundaryLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
    this.startBoundary.points(startBoundaryLinePoints)
    this.endBoundary.points(endBoundaryLinePoints)
  }

  onRectDragEnd() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { start, end, distance, aboveLine } = konvaAttrToDataAvoidAxisArrowForRange(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  render() {
    const { rectX, rectY, rectWidth, startCordLinePoints, endCordLinePoints, startBoundaryLinePoints, endBoundaryLinePoints } = dataToKanvaAttrForRange(this.props)

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
        <Line
          points={startBoundaryLinePoints}
          stroke={grey800}
          strokeWidth={3}
          ref={(line) => {this.startBoundary = line}}
        />
        <Line
          points={endBoundaryLinePoints}
          stroke={grey800}
          strokeWidth={3}
          ref={(line) => {this.endBoundary = line}}
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
