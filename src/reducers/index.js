import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import ui from './ui'
import data from './data'

export default combineReducers({
  routing,
  ui,
  data
})
