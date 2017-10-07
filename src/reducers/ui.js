const initialState = {
  editPanelOpen: false
}


const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PANEL':
      return Object.assign({}, state, {
        editPanelOpen: !state.editPanelOpen
      })
    default:
      return state
  }
}

export default ui
