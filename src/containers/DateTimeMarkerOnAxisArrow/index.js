import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect } from 'react-konva'

import { localTimeInYMD, timestampToX } from '../../utils'

let DateTimeMarkerOnAxisArrow = ({ visible, whenX, when, aboveLine, axisArrowLineWidth }) => {
  return (
    <Group visible={visible}>
      <Rect
        x={whenX - 60}
        y={aboveLine ? window.innerHeight / 2 - axisArrowLineWidth - (3 + 14) : window.innerHeight / 2 + axisArrowLineWidth + 2}
        fill='#ffffff'
        // stroke='#000000'
        width={120}
        height={16}
        cornerRadius={5}
      />
      <Text
        x={whenX - 60}
        y={aboveLine ? window.innerHeight / 2 - axisArrowLineWidth - (3 + 14) : window.innerHeight / 2 + axisArrowLineWidth + 2}
        text={localTimeInYMD(when)}
        fontSize={12}
        fontFamily='Calibri'
        fill='#555'
        width={120}
        padding={2}
        align='center'
      />
    </Group>
  )
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  whenX: timestampToX(ownProps.when, state.data.axisArrow.scale, state.data.axisArrow.centralTime),
  axisArrowLineWidth: state.data.axisArrow.lineWidth
})

DateTimeMarkerOnAxisArrow = connect(
  mapStateToProps,
  null
)(DateTimeMarkerOnAxisArrow)

export default DateTimeMarkerOnAxisArrow
