import React from 'react'
import { connect } from 'react-redux'
import { Group, Rect } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors'

import { CREATE_INCIDENT_FROM_CONTEXT_MENU } from '../../actions'

import Entry from './entry'

let ContextMenu = ({ open, mouseX, mouseY, dispatch }) => {
  const x = mouseX
  const y = mouseY //TODO
  const width = 200, height = 140, menuEntryTexHeight = 28

  const onClick = (type, e) => {
    dispatch(CREATE_INCIDENT_FROM_CONTEXT_MENU(type, e.evt.clientX, e.evt.clientY))
  }

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
        y={y + 20}
        icon={'\u2328'}
        text='TextBox'
        onClick={(e) => onClick('textbox', e)}
      />
      <Entry
        x={x}
        y={y + 20 + menuEntryTexHeight * 1}
        icon={'\u2328'}
        text='Detached TextBox'
        onClick={(e) => onClick('detached-textbox', e)}
      />
      <Entry
        x={x}
        y={y + 20 + menuEntryTexHeight * 2}
        icon={'\u27F7'}
        text='Range'
        onClick={(e) => onClick('range', e)}
      />
      <Entry
        x={x}
        y={y + 20 + menuEntryTexHeight * 3}
        icon={'\u26CA'}
        text='Milestone'
        onClick={(e) => onClick('milestone', e)}
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
