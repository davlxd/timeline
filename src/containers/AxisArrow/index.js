import React from 'react'
import { Arrow, Group, Line } from 'react-konva'
import { connect } from 'react-redux'
import { grey800 } from 'material-ui/styles/colors'

import { TOGGLE_EDIT_PANEL } from '../../actions'
import { PIXELS_PER_SCALE } from '../../constants'

import './style.css'

const approximateMetricUnit = (scale) => { //TODO
  if (scale <= 60 * 1000 ) return 'min'
  if (scale <= 60 * 60 * 1000 ) return 'h'
  if (scale <= 24 * 60 * 60 * 1000 ) return 'd'
  if (scale <= 30 * 24 * 60 * 60 * 1000 ) return 'M'
}

function* pendulumGenerator() {
  let count = 1
  let flag = 1

  yield 0
  while (true) {
    yield flag * count
    flag = -flag
    if (flag > 0) count++
  }
}

function* metricsTimestampGeneratror(centralTime, metricUnit) {
  const d = new Date(centralTime)
  const pendulum = pendulumGenerator()

  while (true) {
    if (metricUnit === 'min') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + pendulum.next().value).getTime()
    }
    if (metricUnit === 'h') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + pendulum.next().value).getTime()
    }
    if (metricUnit === 'd') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate() + pendulum.next().value).getTime()
    }
    if (metricUnit === 'M') {
      yield new Date(d.getFullYear(), d.getMonth() + pendulum.next().value).getTime()
    }
  }
}

function* metricMarkerXAxisGenerator(scale, centralTime, metricUnit) {
  const metricsTimestamp = metricsTimestampGeneratror(centralTime, metricUnit)
  while (true) {
    let x = ((metricsTimestamp.next().value - centralTime) / scale) * PIXELS_PER_SCALE + window.innerWidth / 2
    if (x < window.innerWidth * -0.5 || x > window.innerWidth * 1.5) return
    yield x
  }
}


let AxisArrow = ({ scale, centralTime, lineWidth, onClick }) => {
  const metricMarkerXAxis = metricMarkerXAxisGenerator(scale, centralTime, approximateMetricUnit(scale))
  return (
    <Group>
      <Arrow
        x={0}
        y={window.innerHeight / 2}
        points={[0,0, window.innerWidth - lineWidth, 0]}
        pointerLength={20}
        pointerWidth={20}
        fill={grey800}
        stroke={grey800}
        strokeWidth={lineWidth}
        onClick={onClick}
      />
      {
        [...metricMarkerXAxis].map(x =>
          <Line
            key={x}
            points={[x, (window.innerHeight / 2 - lineWidth / 2 - 2), x, (window.innerHeight / 2 + lineWidth / 2 + 2)]}
            stroke={grey800}
            strokeWidth={1}
          />
        )
      }
    </Group>
  )
}

const mapStateToProps = (state) => ({
  ...state.data.axisArrow
})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(TOGGLE_EDIT_PANEL('axisarrow'))
  }
})

AxisArrow = connect(
  mapStateToProps,
  mapDispatchToProps
)(AxisArrow)


export default AxisArrow
