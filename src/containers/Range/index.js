import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey300, grey400, grey500 } from 'material-ui/styles/colors'
import { Group, Rect, Line } from 'react-konva'

import { INCIDENT_DRAGGED } from '../../actions'

import { calcRangePosition, timestampToX, xToTimestamp, calcFromRangePosition } from '../../utils/positionCalculator'

export const RANGE_HEIGHT = 30

class Range extends Component {
  onDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { startX, endX, distance, aboveLine } = calcFromRangePosition(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime)
    const { rectX, rectY, rectWidth, startCordLinePoints, endCordLinePoints } = calcRangePosition(startX, endX, distance, aboveLine, axisArrowLineWidth)

    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
  }

  onDragEnd() {
    const { width, height, scale, centralTime } = this.props
    const { startX, endX, distance, aboveLine } = calcFromRangePosition(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime)
    const start = xToTimestamp(startX)
    const end = xToTimestamp(endX)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  render() {
    const { startX, endX, distance, aboveLine, axisArrowLineWidth } = this.props
    const { rectX, rectY, rectWidth, startCordLinePoints, endCordLinePoints } = calcRangePosition(startX, endX, distance, aboveLine, axisArrowLineWidth)

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
          onDragMove={this.onDragMove.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
          // onClick={this.onClick.bind(this)}
          // onTap={this.onClick.bind(this)}
          // onMouseOver={this.onMouseOver.bind(this)}
          // onMouseOut={this.onMouseOut.bind(this)}
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
  startX: timestampToX(ownProps.start, state.data.axisArrow.scale, state.data.axisArrow.centralTime),
  endX: timestampToX(ownProps.end, state.data.axisArrow.scale, state.data.axisArrow.centralTime),
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
})

Range = connect(
  mapStateToProps,
  null
)(Range)
export default Range
