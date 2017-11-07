import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors'

import Entry from './entry'

let ContextMenu = ({ open, mouseX, mouseY }) => {
  const x = mouseX
  const y = mouseY //TODO
  const width = 200, height = 140, menuEntryTexHeight = 28, menuEntryTextFontFamily = 'Roboto, sans-serif'
  const menuEntryTextSize = 15, menuEntryPadding = 20
  return (
    <Group
      visible={open}
      >
      <Rect
        x={x}
        y={y}
        fill='#ffffff'
        width={width}
        height={height}
        shadowColor={grey800}
        shadowBlur={2}
        shadowOffset={[10, 10]}
        shadowOpacity={0.2}
        cornerRadius={2}
      />
      <Entry
        x={x}
        y={y}
        icon={'\u2328'}
        text='TextBox'
      />
      <Entry
        x={x}
        y={y + menuEntryTexHeight * 1}
        icon={'\u2328'}
        text='Detached TextBox'
      />
      <Entry
        x={x}
        y={y + menuEntryTexHeight * 2}
        icon={'\u27F7'}
        text='Range'
      />
      <Entry
        x={x}
        y={y + menuEntryTexHeight * 3}
        icon={'\u26CA'}
        text='Milestone'
      />
    </Group>
  )
}

const mapStateToProps = (state, ownProps) => ({
  ...state.ui.contextMenu
})

ContextMenu = connect(
  mapStateToProps,
  null
)(ContextMenu)

export default ContextMenu
