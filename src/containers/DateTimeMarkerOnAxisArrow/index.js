import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect } from 'react-konva'

import { localTimeInYMD } from '../../utils'


let DateTimeMarkerOnAxisArrow = ({ visible, midPoint, when, aboveLine, axisArrowLineWidth }) => {
  return (
    <Group visible={visible}>
      <Rect
        x={midPoint - 70}
        y={aboveLine ? window.innerHeight / 2 - axisArrowLineWidth - (3 + 14) : window.innerHeight / 2 + axisArrowLineWidth + 3}
        fill='#ffffff'
        // stroke='#000000'
        width={140}
        height={16}
        cornerRadius={5}
      />
      <Text
        x={midPoint - 70}
        y={aboveLine ? window.innerHeight / 2 - axisArrowLineWidth - (3 + 14) : window.innerHeight / 2 + axisArrowLineWidth + 3}
        text={localTimeInYMD(when)}
        fontSize={12}
        fontFamily='Calibri'
        fill='#555'
        width={140}
        padding={2}
        align='center'
      />
    </Group>
  )
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  axisArrowLineWidth: state.data.axisArrow.lineWidth
})

DateTimeMarkerOnAxisArrow = connect(
  mapStateToProps,
  null
)(DateTimeMarkerOnAxisArrow)

export default DateTimeMarkerOnAxisArrow
