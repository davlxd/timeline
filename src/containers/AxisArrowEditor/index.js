import React from 'react'
import Slider from 'material-ui/Slider'
import Paper from 'material-ui/Paper'
import { grey400 } from 'material-ui/styles/colors';

import './style.css'

let AxisArrowEditor = ({ isOpen, onRequestClose }) => (
  <div>
    <div className="Title">
      <h3>Axis Arrow</h3>
    </div>
    <Paper className="Card">
      <span> Scale </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <span> Central Timestamp </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <span> Line Width </span>
      <Slider className="Slider"/>
    </Paper>

  </div>
)



export default AxisArrowEditor
