import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey800, grey400 } from 'material-ui/styles/colors'

import { Group, Label, Text, Tag, Line } from 'react-konva'

import { dataToKanvaAttrForMilestone, konvaAttrToDataForMilestone } from './positionCalculator'


export const MILESTONE_RECT_HEIGHT = 15
export const MILESTONE_RECT_WIDTH = 10
export const MILESTONE_POINTER_HEIGHT = 10

class Milestone extends Component {

  onDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { x, y } = { x: this.canvasLabel.x(), y: this.canvasLabel.y() }
    const newPropsCalcFromKonvaAttr = konvaAttrToDataForMilestone(x, y, scale, centralTime, axisArrowLineWidth)

    const { pointerDirection, cordLinePoints } = dataToKanvaAttrForMilestone({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.canvasLabel.x(x)
    this.canvasLabel.y(y)
    this.cordLine.points(cordLinePoints)
    this.canvasTag.pointerDirection(pointerDirection)
  }

  onDragEnd() {

  }

  render() {
    const { x, y, pointerDirection, cordLinePoints } = dataToKanvaAttrForMilestone(this.props)
    return (
      <Group>
        <Line
          points={cordLinePoints}
          stroke={grey400}
          strokeWidth={0.5}
          ref={(line) => {this.cordLine = line}}
        />
        <Label
          x={x}
          y={y}
          ref={(label) => {this.canvasLabel = label}}
          onDragMove={this.onDragMove.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
          draggable={true}
          >
            <Text
              width={MILESTONE_RECT_WIDTH}
              height={MILESTONE_RECT_HEIGHT}
              cornerRadius={0}
              fill={grey800}
            />
            <Tag
              pointerWidth={MILESTONE_RECT_WIDTH}
              pointerHeight={MILESTONE_RECT_WIDTH}
              fill={grey800}
              pointerDirection={pointerDirection}
              shadowColor={grey800}
              shadowBlur={5}
              shadowOffset={5}
              shadowOpacity={0.5}
              ref={(tag) => {this.canvasTag = tag}}
            />
          </Label>
      </Group>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  scale: state.data.axisArrow.scale,
  centralTime: state.data.axisArrow.centralTime,
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
})

Milestone = connect(
  mapStateToProps,
  null
)(Milestone)
export default Milestone
