import React from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors'


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
      <Text
          x={x}
          y={y}
          text={'\u2328 TextBox'}
          fontSize={menuEntryTextSize}
          fontFamily={menuEntryTextFontFamily}
          fill='#555'
          width={width}
          padding={menuEntryPadding}
          align='left'
          ref={(text) => {this.canvasText = text}}
      />
      <Text
          x={x}
          y={y + menuEntryTexHeight * 1}
          text={'\u2328 Detached TextBox'}
          fontSize={menuEntryTextSize}
          fontFamily={menuEntryTextFontFamily}
          fill='#555'
          width={width}
          padding={menuEntryPadding}
          align='left'
          ref={(text) => {this.canvasText = text}}
      />
      <Text
          x={x}
          y={y + menuEntryTexHeight * 2}
          text={'\u27F7 Range'}
          fontSize={menuEntryTextSize}
          fontFamily={menuEntryTextFontFamily}
          fill='#555'
          width={width}
          padding={menuEntryPadding}
          align='left'
          ref={(text) => {this.canvasText = text}}
      />
      <Text
          x={x}
          y={y + menuEntryTexHeight * 3}
          text={'\u26CA Milestone'}
          fontSize={menuEntryTextSize}
          fontFamily={menuEntryTextFontFamily}
          fill='#555'
          width={width}
          padding={menuEntryPadding}
          align='left'
          ref={(text) => {this.canvasText = text}}
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
