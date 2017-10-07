import React from 'react'
import { Arrow } from 'react-konva'
import { connect } from 'react-redux'
import { grey800 } from 'material-ui/styles/colors'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let AxisArrow = ({ dispatch }) => (
  <Arrow
    x={0}
    y={window.innerHeight / 2}
    points={[0,0, window.innerWidth, 0]}
    pointerLength={20}
    pointerWidth={20}
    fill={grey800}
    stroke={grey800}
    strokeWidth={4}
    onClick={() => dispatch(TOGGLE_EDIT_PANEL)}
  />
)
AxisArrow = connect()(AxisArrow)

export default AxisArrow
