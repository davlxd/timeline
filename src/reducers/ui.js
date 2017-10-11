const initialState = {
  editPanelOpen: false,
  eventTypeOnEditPanel: '',
  eventTimestampOnEditPanel: 0
}


const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PANEL':
      return Object.assign({}, state, {
        editPanelOpen: !state.editPanelOpen,
        eventTypeOnEditPanel: action.editType,
        eventTimestampOnEditPanel: action.when
      })
    default:
      return state
  }
}

export default ui
