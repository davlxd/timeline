import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey800 } from 'material-ui/styles/colors'

import { Group, Label, Text, Tag } from 'react-konva'

class Milestone extends Component {

  render() {
    return (
      <Group>

        <Label
          x={400}
          y={400}
          >
            <Text
              width={10}
              height={15}
              cornerRadius={0}
              fill={grey800}
            />
            <Tag
              pointerWidth={10}
              pointerHeight={10}
              fill={grey800}
              pointerDirection='down'
              shadowColor={grey800}
              shadowBlur={10}
              shadowOffset={10}
              shadowOpacity={0.5}
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
