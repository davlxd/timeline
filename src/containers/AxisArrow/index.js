import React from 'react'
import { Arrow, Group, Line, Text } from 'react-konva'
import { connect } from 'react-redux'
import { grey800 } from 'material-ui/styles/colors'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import { markerGenerator } from './markerGenerator'

import './style.css'

const approximateMetricUnit = (scale) => { //TODO
  if (scale <= 60 * 1000 ) return 'min'
  if (scale <= 60 * 60 * 1000 ) return 'h'
  if (scale <= 24 * 60 * 60 * 1000 ) return 'd'
  if (scale <= 30 * 24 * 60 * 60 * 1000 ) return 'M'
}

let AxisArrow = ({ scale, centralTime, lineWidth, onClick }) => {
  const markerGen = markerGenerator(scale, centralTime, approximateMetricUnit(scale))
  const formatDate = (timestamp) => {
    return new Date(timestamp).toISOString().slice(0, 10)
  }
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
        [...markerGen].map(timestampAndX =>
          <Group key={timestampAndX.x}>
            <Line
              points={[timestampAndX.x, (window.innerHeight / 2 - lineWidth / 2 - 2), timestampAndX.x, (window.innerHeight / 2 + lineWidth / 2 + 2)]}
              stroke={grey800}
              strokeWidth={1}
            />
            <Text
              x={timestampAndX.x - 25}
              y={(window.innerHeight / 2 - lineWidth / 2 + 6)}
              text={formatDate(timestampAndX.timestamp)}
              fontSize={10}
              fontFamily='Calibri'
              fill='#555'
              width={50}
              padding={1}
              align='center'
            />
          </Group>
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
