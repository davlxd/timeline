import React from 'react'
import { Arrow, Group, Line, Text } from 'react-konva'
import { connect } from 'react-redux'
import { grey800 } from 'material-ui/styles/colors'

import { TOGGLE_EDIT_PANEL, DISABLE_AXISARROW_MARKERS } from '../../actions'
import { MIN_MS, HOUR_MS, DAY_MS, MONTH30_MS, YEAR_MS } from '../../constants'

import { markerGenerator } from './markerGenerator'
import { markerFormater } from './markerFormater'

import './style.css'

const approximateMetricUnit = (scale) => { //TODO
  if (scale <= MIN_MS ) return 'min'
  if (scale <= HOUR_MS ) return 'h'
  if (scale <= DAY_MS ) return 'd'
  if (scale <= MONTH30_MS ) return 'M'
  if (scale <= YEAR_MS ) return 'y'
  return 'x'
}

let AxisArrow = ({ scale, centralTime, lineWidth, onClick, onScopeTooLarge }) => {
  const metricUnit = approximateMetricUnit(scale)
  let markerGen = []
  if (metricUnit === 'x') {
    onScopeTooLarge()
  } else {
    markerGen = markerGenerator(scale, centralTime, metricUnit)
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
              text={markerFormater(timestampAndX.timestamp).marker}
              fontSize={markerFormater(timestampAndX.timestamp).fontSize}
              fontFamily='"Times New Roman", Georgia, Serif'
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
  ...state.data.axisArrow,
  contextMenuEventTimestamp: state.ui.contextMenu.eventTimestamp
})

const mapDispatchToProps = (dispatch) => ({
  onToggleEditPanel: () => {
    dispatch(TOGGLE_EDIT_PANEL('axisarrow', 0, true))
  },
  onScopeTooLarge: () => {
    dispatch(DISABLE_AXISARROW_MARKERS)
  }
})

AxisArrow = connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onClick(e) {
      if (Math.abs(e.evt.timeStamp - stateProps.contextMenuEventTimestamp) < 500) return;
      dispatchProps.onToggleEditPanel()
    }
  })
)(AxisArrow)


export default AxisArrow
