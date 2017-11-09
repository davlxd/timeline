import React from 'react'
import { Group, Rect, Text } from 'react-konva'


let Entry = ({x, y, icon, text, onClick}) => {
  const iconWidth = 60, textWidth = 200, menuEntryTexHeight = 28, menuEntryTextFontFamily = 'Roboto, sans-serif'
  const menuEntryTextSize = 15, menuEntryPadding = 0
  return (
    <Group>
      <Text
        x={x}
        y={y}
        text={icon}
        fontSize={menuEntryTextSize}
        fontFamily={menuEntryTextFontFamily}
        fill='#555'
        width={60}
        padding={menuEntryPadding}
        align='center'
      />
      <Text
        x={x + 50}
        y={y}
        text={text}
        fontSize={menuEntryTextSize}
        fontFamily={menuEntryTextFontFamily}
        fill='#555'
        width={textWidth}
        padding={menuEntryPadding}
        align='left'
      />
      <Rect
        x={x}
        y={y - 6}
        // stroke='black'
        width={200}
        height={menuEntryTexHeight + menuEntryPadding}
        onClick={onClick}
        onTap={onClick}
      />
    </Group>

  )
}

export default Entry
