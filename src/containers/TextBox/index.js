import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let TextBox = ({ id, when, type, text, midPoint, width, height, distance, aboveLine, dispatch }) => {
  let x = midPoint - width / 2
  let y, linePoints
  if (aboveLine) {
    y = window.innerHeight / 2 - distance - height
    linePoints = [midPoint, (window.innerHeight / 2), midPoint, (window.innerHeight / 2 - distance)]
  } else {
    y = window.innerHeight / 2 + distance
    linePoints = [midPoint, (window.innerHeight / 2), midPoint, (window.innerHeight / 2 + distance)]
  }

  return (
    <Group>
      <Text
        x={x}
        y={y}
        text={text}
        fontSize={18}
        fontFamily='Calibri'
        fill='#555'
        width={width}
        padding={20}
        align='center'
      />
      <Rect
        x={x}
        y={y}
        stroke={grey800}
        strokeWidth={2}
        width={width}
        height={height}
        shadowColor={grey800}
        shadowBlur={10}
        shadowOffset={[10, 10]}
        shadowOpacity={0.2}
        cornerRadius={5}
        onClick={() => dispatch(TOGGLE_EDIT_PANEL(type, id))}
      />
      <Line
        points={linePoints}
        stroke={grey800}
      />
    </Group>
  )
}
TextBox = connect()(TextBox)

export default TextBox
