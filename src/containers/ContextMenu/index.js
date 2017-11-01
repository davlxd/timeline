import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors'


let ContextMenu = ({ open, mouseX, mouseY }) => {
  const x = mouseX
  const y = mouseY
  return (
    <Group
      visible={open}
      >
      <Rect
        x={x}
        y={y}
        fill='#ffffff'
        width={200}
        height={250}
        shadowColor={grey800}
        shadowBlur={10}
        shadowOffset={[10, 10]}
        shadowOpacity={0.2}
        cornerRadius={2}
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
