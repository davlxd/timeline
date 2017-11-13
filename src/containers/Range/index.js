import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey800, grey400 } from 'material-ui/styles/colors'
import { Group, Rect } from 'react-konva'

import { timestampToX, calcRangePosition } from '../../utils/positionCalculator'

export const RANGE_HEIGHT = 30

class Range extends Component {
  render() {
    const { startX, endX, distance, aboveLine, axisArrowLineWidth } = this.props
    const { rectX, rectY, rectWidth } = calcRangePosition(startX, endX, distance, aboveLine, axisArrowLineWidth)
    console.log(startX)
    return (
      <Group>
        <Rect
          x={rectX}
          y={rectY}
          // stroke={grey800}
          // strokeWidth={2}
          width={rectWidth}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fillLinearGradientStartPointX={0}
          fillLinearGradientStartPointY={rectY}
          fillLinearGradientEndPointX={rectWidth}
          fillLinearGradientEndPointY={rectY}
          fillLinearGradientColorStops={[0, grey400, 0.2, '#ffffff', 0.8, '#ffffff', 1, grey400]}
        />
      </Group>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  startX: timestampToX(ownProps.start, state.data.axisArrow),
  endX: timestampToX(ownProps.end, state.data.axisArrow),
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
})

Range = connect(
  mapStateToProps,
  null
)(Range)
export default Range
