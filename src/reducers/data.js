import { newIncidentData } from './newIncident'

const initialState = {
  axisArrow: {
    centralTime: new Date().getTime(),
    lineWidth: 4,
    scale: (24 * 60 * 60 * 1000)
  },
  incidents: []
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'TEXT_ON_TEXT_BOX_EDITOR_CHANGE':
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id !== action.id) return incident
          return {
            ...incident,
            text: action.text
          }
        })
      }
    case 'CONFIG_ON_EDITOR_CHANGE':
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id !== action.id) return incident
          return {
            ...incident,
            ...action.newConfig
          }
        })
      }
    case 'UPDATE_TEXT_BOX_HEIGHT':
      return {
        ...state,
        incidents: state.incidents.map(incident => {
          if (incident.id !== action.id) return incident
          return {
            ...incident,
            height: action.height
          }
        })
      }
    case 'ZOOM_IN':
      return {
        ...state,
        axisArrow: {
          ...state.axisArrow,
          scale: state.axisArrow.scale * 0.8
        }
      }
    case 'ZOOM_OUT':
      return {
        ...state,
        axisArrow: {
          ...state.axisArrow,
          scale: state.axisArrow.scale * 1.2
        }
      }
    case 'STAGE_BEING_DRAGGED':
      return {
        ...state,
        axisArrow: {
          ...state.axisArrow,
          centralTime: action.newCentralTime
        }
      }
    case 'CREATE_INCIDENT_FROM_CONTEXT_MENU':
      return {
        ...state,
        nextIncidentId: state.nextIncidentId + 1,
        incidents: [
          ...state.incidents,
          newIncidentData(action.x, action.y, action.incidentType, state.nextIncidentId, state.axisArrow)
        ]
      }
    default:
      return state
  }
}

export default data
