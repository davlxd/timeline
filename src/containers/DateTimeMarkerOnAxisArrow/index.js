import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect } from 'react-konva'

import { localTimeInYMD, timestampToX } from '../../utils'
import { MONTH30_MS } from '../../constants'


let DateTimeMarkerOnAxisArrow = ({ visible, whenX, when, aboveLine, axisArrowLineWidth, scale }) => {
  const width = scale >= MONTH30_MS ? 65 : 120
  const x = scale >= MONTH30_MS ? (whenX - 32.5) : (whenX - 60)
  return (
    <Group visible={visible}>
      <Rect
        x={x}
        y={aboveLine ? window.innerHeight / 2 - axisArrowLineWidth - (3 + 14) : window.innerHeight / 2 + axisArrowLineWidth + 2}
        fill='#ffffff'
        // stroke='#000000'
        width={width}
        height={16}
        cornerRadius={5}
      />
      <Text
        x={x}
        y={aboveLine ? window.innerHeight / 2 - axisArrowLineWidth - (3 + 14) : window.innerHeight / 2 + axisArrowLineWidth + 2}
        text={localTimeInYMD(when, scale)}
        fontSize={12}
        fontFamily='Calibri'
        fill='#555'
        width={width}
        padding={2}
        align='center'
      />
    </Group>
  )
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  whenX: timestampToX(ownProps.when, state.data.axisArrow.scale, state.data.axisArrow.centralTime),
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
  scale: state.data.axisArrow.scale
})

DateTimeMarkerOnAxisArrow = connect(
  mapStateToProps,
  null
)(DateTimeMarkerOnAxisArrow)

export default DateTimeMarkerOnAxisArrow
