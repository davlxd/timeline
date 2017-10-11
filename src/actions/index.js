export const TOGGLE_EDIT_PANEL = (editType = '', eventTimestamp = 0) => ({
  type: 'TOGGLE_EDIT_PANEL',
  editType: editType,
  when: eventTimestamp
})
