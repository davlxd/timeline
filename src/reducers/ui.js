const initialState = {
  editPanelOpen: false,
  eventTypeOnEditPanel: '',
  eventIdOnEditPanel: 0
}


const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PANEL':
      return Object.assign({}, state, {
        editPanelOpen: !state.editPanelOpen,
        eventTypeOnEditPanel: action.editType,
        eventIdOnEditPanel: action.id
      })
    default:
      return state
  }
}

export default ui
