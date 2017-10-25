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
    case 'DUPLICATE_THIS_EVENT':
      const targetEvent = state.data.events.filter(event => event.id === action.id)[0]
      const newEvent = {
        ...targetEvent,
        id: state.data.nextEventId,
        when: targetEvent.when + 86400000
      }
      return {
        data:{
          ...state.data,
          nextEventId: state.data.nextEventId + 1,
          events:[
            ...state.data.events,
            newEvent
          ]
        },
        ui: {
          ...state.ui,
          eventIdOnEditPanel: newEvent.id
        }
      }
    case 'DELETE_THIS_EVENT':
      return {
        data:{
          ...state.data,
          events: state.data.events.filter(event => event.id !== action.id)
        },
        ui: {
          ...state.ui,
          eventTypeOnEditPanel: '',
          editPanelOpen: false
        }
      }
    case 'EVENT_DRAGGED':
      const when = (((action.newPosition.midPoint - (window.innerWidth / 2)) / PIXELS_PER_SCALE) * state.data.axisArrow.scale) + state.data.axisArrow.centralTime
      return {
        data:{
          ...state.data,
          events: state.data.events.map(event => {
            if (event.id !== action.id) return event
            return {
              ...event,
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
