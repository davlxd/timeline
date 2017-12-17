import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import ui from './ui'
import data from './data'

const combinedReducer = combineReducers({
  routing,
  ui,
  data
})

const incrementTimestamp = (targetIncident, scale) => {
  if ('when' in targetIncident) {
    return {
      when: targetIncident.when + scale / 2
    }
  }

  if ('start' in targetIncident && 'end' in targetIncident) {
    return {
      start: targetIncident.start + scale / 2,
      end: targetIncident.end + scale / 2
    }
  }
}

const crossSliceReducer = (state, action) => {
  switch(action.type) {
    case 'DUPLICATE_THIS_INCIDENT':
      const targetIncident = state.data.incidents.filter(incident => incident.id === action.id)[0]
      const newIncident = {
        ...targetIncident,
        id: state.data.nextIncidentId,
        ...incrementTimestamp(targetIncident, state.data.axisArrow.scale)
      }
      return {
        data:{
          ...state.data,
          nextIncidentId: state.data.nextIncidentId + 1,
          incidents:[
            ...state.data.incidents,
            newIncident
          ]
        },
        ui: {
          ...state.ui,
          editPanel: {
            ...state.ui.editPanel,
            incidentId: newIncident.id
          }
        }
      }
    case 'DELETE_THIS_INCIDENT':
      return {
        data:{
          ...state.data,
          incidents: state.data.incidents.filter(incident => incident.id !== action.id)
        },
        ui: {
          ...state.ui,
          editPanel: {
            ...state.ui.editPanel,
            open: false,
            incidentType: ''
          }
        }
      }
    case 'INCIDENT_DRAGGED':
      return {
        data:{
          ...state.data,
          incidents: state.data.incidents.map(incident => {
            if (incident.id !== action.id) return incident
            return {
              ...incident,
              ...action.newPosition,
            }
          })
        },
        ui: state.ui
      }
    case 'RECEIVE_LINE':
      console.log('action')
      console.log(action)
      return {
        data: action.data.data,
        ui: state.ui
      }
    case 'REQUEST_LINE_ERROR':
      console.log('action')
      console.log(action)
      return state
    default:
      return state
  }
}

export default (state, action) => {
  const intermediateState = combinedReducer(state, action)
  return crossSliceReducer(intermediateState, action)
}
