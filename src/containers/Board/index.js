import React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer } from 'react-konva'
import EditPanel from '../EditPanel'
import AxisArrow from '../AxisArrow'
import TextBox from '../TextBox'

import { PIXELS_PER_SCALE } from '../../constants'

let Board = ({ textBoxList }) => {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <AxisArrow />
          {
            textBoxList.map(textBox =>
              <TextBox
                key={textBox.id}
                {...textBox}
              />
            )
          }
        </Layer>
      </Stage>
      <EditPanel />
    </div>
  )
}


const getTextBoxList = (state) => (
  state.data.events
  .filter(event => event.type === 'textbox')
  .map((event) => ({
    ...event,
    midPoint: window.innerWidth / 2 + ((event.when - state.data.axisArrow.centralTime) / state.data.axisArrow.scale) * PIXELS_PER_SCALE
  }))
)

const mapStateToProps = (state) => ({
  textBoxList: getTextBoxList(state)
})

Board = connect(
  mapStateToProps,
  null
)(Board)


export default Board
