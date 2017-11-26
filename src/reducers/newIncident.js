import { konvaAttrToDataForTextBox } from '../containers/TextBox/positionCalculator'
import { konvaAttrToDataForRange } from '../containers/Range/positionCalculator'

const TEXT_BOX_DEFAULT_WIDTH = 200
const TEXT_BOX_DEFAULT_HEIGHT = 38
const newTextBox = (x, y, incidentType, nextIncidentId, scale, centralTime) => {
  const { distance, aboveLine, when } = konvaAttrToDataForTextBox(x, y, TEXT_BOX_DEFAULT_WIDTH, TEXT_BOX_DEFAULT_HEIGHT, scale, centralTime)
  return {
    id: nextIncidentId,
    when,
    type: incidentType,
    text: 'TextBox',
    width: TEXT_BOX_DEFAULT_WIDTH,
    height: TEXT_BOX_DEFAULT_HEIGHT,
    distance,
    aboveLine
  }
}

const RANGE_BOX_DEFAULT_WIDTH = 200
const newRange = (x, y, incidentType, nextIncidentId, scale, centralTime, axisArrowLineWidth) => {
  const { start, end, distance, aboveLine } = konvaAttrToDataForRange(x, y, RANGE_BOX_DEFAULT_WIDTH, scale, centralTime, axisArrowLineWidth)
  return {
    id: nextIncidentId,
    type: incidentType,
    text: 'Ranger',
    start,
    end,
    distance,
    aboveLine
  }
}


export const newIncidentData = (x, y, incidentType, nextIncidentId, { scale, centralTime, lineWidth }) => {
  if (incidentType === 'textbox') {
    return newTextBox(x, y, incidentType, nextIncidentId, scale, centralTime)
  } else if (incidentType === 'range'){
    return newRange(x, y, incidentType, nextIncidentId, scale, centralTime, lineWidth)
  }
}
