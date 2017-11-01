import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { PIXELS_PER_SCALE } from '../constants'

import ui from './ui'
import data from './data'

const combinedReducer = combineReducers({
  routing,
  ui,
  data
})


const crossSliceReducer = (state, action) => {
  switch(action.type) {
    case 'DUPLICATE_THIS_INCIDENT':
      const targetIncident = state.data.incidents.filter(incident => incident.id === action.id)[0]
      const newIncident = {
        ...targetIncident,
        id: state.data.nextIncidentId,
        when: targetIncident.when + state.data.axisArrow.scale / 2
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
      const when = (((action.newPosition.midPoint - (window.innerWidth / 2)) / PIXELS_PER_SCALE) * state.data.axisArrow.scale) + state.data.axisArrow.centralTime
      return {
        data:{
          ...state.data,
          incidents: state.data.incidents.map(incident => {
            if (incident.id !== action.id) return incident
            return {
              ...incident,
              ...action.newPosition,
              when
            }
          })
        },
        ui: state.ui
      }
    default:
      return state
  }
}

export default (state, action) => {
  const intermediateState = combinedReducer(state, action)
  return crossSliceReducer(intermediateState, action)
}
