export * from './restRequest'


export const TOGGLE_EDIT_PANEL = (editType = '', id = 0) => ({
  type: 'TOGGLE_EDIT_PANEL',
  editType: editType,
  id: id
})

export const DUPLICATE_THIS_INCIDENT = (id = 0) => ({
  type: 'DUPLICATE_THIS_INCIDENT',
  id: id
})

export const DELETE_THIS_INCIDENT = (id = 0) => ({
  type: 'DELETE_THIS_INCIDENT',
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

export const INCIDENT_DRAGGED = (id = 0, newPosition = {}) => ({
  type: 'INCIDENT_DRAGGED',
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

export const SHOW_CONTEXT_MENU = (mouseX = 0, mouseY = 0, eventTimestamp = 0) => ({
  type: 'SHOW_CONTEXT_MENU',
  mouseX,
  mouseY,
  eventTimestamp
})

export const CLOSE_CONTEXT_MENU_IF_ANY = {
  type: 'CLOSE_CONTEXT_MENU_IF_ANY'
}

export const CREATE_INCIDENT_FROM_CONTEXT_MENU = (type = '', mouseX = 0, mouseY = 0) => ({
  type: 'CREATE_INCIDENT_FROM_CONTEXT_MENU',
  incidentType: type,
  x: mouseX,
  y: mouseY
})
