import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import { TOGGLE_EDIT_PANEL, UPDATE_TEXT_BOX_HEIGHT } from '../../actions'

import './style.css'

class TextBox extends Component {
  componentDidUpdate(props) {
    if (props.height !== this.canvasText.getHeight()) {
      props.dispatch(UPDATE_TEXT_BOX_HEIGHT(props.id, this.canvasText.getHeight()))
    }
  }

  calcPosition() {
    const { midPoint, width, height, distance, aboveLine } = this.props

    let x = midPoint - width / 2
    let y, linePoints
    if (aboveLine) {
      y = window.innerHeight / 2 - distance - height
      linePoints = [midPoint, (window.innerHeight / 2), midPoint, (window.innerHeight / 2 - distance)]
    } else {
      y = window.innerHeight / 2 + distance
      linePoints = [midPoint, (window.innerHeight / 2), midPoint, (window.innerHeight / 2 + distance)]
    }
    return {
      x,
      y,
      linePoints
    }
  }
  calcFromPosition(x, y) {
    //TODO Avoid axisarrow
    return {
      midPoint : x,
      distance : y,
      aboveLine: true
    }
  }

  onDragMove() {
    console.log(this.canvasRect)
    console.log(this.canvasText)
    console.log('move')
    this.canvasText.x(this.canvasRect.x())
    this.canvasText.y(this.canvasRect.y())
    return false
  }

  render() {
    const { id, type, text, width, height, dispatch } = this.props
    const { x, y, linePoints} = this.calcPosition()

    return (
      <Group>
        <Text
          x={x}
          y={y}
          text={text}
          fontSize={18}
          fontFamily='Calibri'
          fill='#555'
          width={width}
          padding={20}
          align='center'
          ref={(text) => {this.canvasText = text}}
        />
        <Rect
          x={x}
          y={y}
          stroke={grey800}
          strokeWidth={2}
          width={width}
          height={height}
          shadowColor={grey800}
          shadowBlur={10}
          shadowOffset={[10, 10]}
          shadowOpacity={0.2}
          cornerRadius={5}
          draggable={true}
          ref={(rect) => {this.canvasRect = rect}}
          onDragMove={this.onDragMove.bind(this)}
          onClick={() => dispatch(TOGGLE_EDIT_PANEL(type, id))}
        />
        <Line
          points={linePoints}
          stroke={grey800}
        />
      </Group>
    )
  }
}
TextBox = connect()(TextBox)

export default TextBox
