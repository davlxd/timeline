import React from 'react'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import './style.css'

const TextBox = ({ text, midpoint, width, height, distance, aboveLine }) => {
  let x = midpoint - width / 2
  let y, linePoints
  if (aboveLine) {
    y = window.innerHeight / 2 - distance - height
    linePoints = [midpoint, (window.innerHeight / 2), midpoint, (window.innerHeight / 2 - distance)]
  } else {
    y = window.innerHeight / 2 + distance
    linePoints = [midpoint, (window.innerHeight / 2), midpoint, (window.innerHeight / 2 + distance)]
  }
  console.log(y)
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
      />
      <Line
        points={linePoints}
        stroke={grey800}
      />
    </Group>
  )
}

export default TextBox