const initialState = {
  editPanelOpen: false,
  eventIdOnEditPanel: 0
}


const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PANEL':
      return Object.assign({}, state, {
        editPanelOpen: !state.editPanelOpen,
        eventIdOnEditPanel: action.id
      })
    default:
      return state
  }
}

export default ui
