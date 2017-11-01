const initialState = {
  editPanel: {
    open: false,
    eventType: '',
    eventId: 0
  },
  contextMenu: {
    open: false,
    mouseX: 0,
    mouseY: 0,
    eventTimestamp: 0
  }
}


const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PANEL':
      return {
        ...state,
        editPanel: {
          open: !state.editPanel.open,
          eventType: action.editType,
          eventId: action.id
        }
      }
    case 'SHOW_CONTEXT_MENU':
      return {
        ...state,
        contextMenu: {
          open: true,
          mouseX: action.mouseX,
          mouseY: action.mouseY,
          eventTimestamp: action.eventTimestamp
        }
      }
    case 'CLOSE_CONTEXT_MENU_IF_ANY':
      return {
        ...state,
        contextMenu: {
          open: false,
          mouseX: 0,
          mouseY: 0
        }
      }
    default:
      return state
  }
}

export default ui
