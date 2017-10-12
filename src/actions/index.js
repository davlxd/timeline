export const TOGGLE_EDIT_PANEL = (editType = '', id = 0) => ({
  type: 'TOGGLE_EDIT_PANEL',
  editType: editType,
  id: id
})

export const DUPLICATE_THIS_EVENT = (id = 0) => ({
  type: 'DUPLICATE_THIS_EVENT',
  id: id
})

export const DELETE_THIS_EVENT = (id = 0) => ({
  type: 'DELETE_THIS_EVENT',
  id: id
})
