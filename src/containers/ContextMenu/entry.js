import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'


let Entry = ({x, y, icon, text}) => {
  const iconWidth = 60, textWidth = 200, menuEntryTexHeight = 28, menuEntryTextFontFamily = 'Roboto, sans-serif'
  const menuEntryTextSize = 15, menuEntryPadding = 20
  return (
    <Group>
      <Text
        x={x}
        y={y}
        text={icon}
        fontSize={menuEntryTextSize}
        fontFamily={menuEntryTextFontFamily}
        fill='#555'
        width={70}
        padding={menuEntryPadding}
        align='center'
      />
      <Text
        x={x + 35}
        y={y}
        text={text}
        fontSize={menuEntryTextSize}
        fontFamily={menuEntryTextFontFamily}
        fill='#555'
        width={textWidth}
        padding={menuEntryPadding}
        align='left'
      />
    </Group>
    
  )
}

export default Entry