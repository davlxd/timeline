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

export const TEXT_ON_TEXT_BOX_EDITOR_CHANGE = (id = 0, text = '') => ({
  type: 'TEXT_ON_TEXT_BOX_EDITOR_CHANGE',
  id: id,
  text: text
})

export const UPDATE_TEXT_BOX_HEIGHT = (id = 0, height = 0) => ({
  type: 'UPDATE_TEXT_BOX_HEIGHT',
  id: id,
  height: height
})

export const EVENT_DRAGGED = (id = 0, newPosition = {}) => ({
  type: 'EVENT_DRAGGED',
  id,
  newPosition
})

export const STAGE_BEING_DRAGGED = (newCentralTime = 0) => ({
  type: 'STAGE_BEING_DRAGGED',
  newCentralTime
})

export const DISABLE_AXISARROW_MARKERS = {
  type: 'DISABLE_AXISARROW_MARKERS'
}

export const ZOOM_IN = {
  type: 'ZOOM_IN'
}

export const ZOOM_OUT = {
  type: 'ZOOM_OUT'
}
