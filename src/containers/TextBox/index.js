import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import { TOGGLE_EDIT_PANEL, UPDATE_TEXT_BOX_HEIGHT, EVENT_BEING_DRAGGED } from '../../actions'

import './style.css'

class TextBox extends Component {
  componentDidUpdate(props) {
    if (props.height !== this.canvasText.getHeight()) {
      props.dispatch(UPDATE_TEXT_BOX_HEIGHT(props.id, this.canvasText.getHeight()))
    }
  }

  calcPosition({ midPoint, width, height, distance, aboveLine }) {
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

  calcFromPosition(x, y, width, height) {
    if (y > ((window.innerHeight / 2) - height) && y <= ((window.innerHeight / 2) - height / 2)) {
      y = (window.innerHeight / 2) - height
    } else if (y > ((window.innerHeight / 2) - height / 2) && y < (window.innerHeight / 2)) {
      y = (window.innerHeight / 2)
    }

    if (y <= ((window.innerHeight / 2) - height / 2)) {
      return {
        distance : (window.innerHeight / 2) - height - y,
        midPoint: x + (width / 2),
        aboveLine: true
      }
    } else {
      return {
        distance : y - (window.innerHeight / 2),
        midPoint: x + (width / 2),
        aboveLine: false
      }
    }
  }

  onDragMove() {
    const { width, height } = this.props
    const { x, y } = { x: this.canvasRect.x(), y: this.canvasRect.y() }
    const { distance, midPoint, aboveLine } = this.calcFromPosition(x, y, width, height)
    const { linePoints } = this.calcPosition({ midPoint, width, height, distance, aboveLine })

    this.canvasText.x(x)
    this.canvasText.y(y)
    this.canvasLine.points(linePoints)
  }

  onDragEnd() {
    const { distance, midPoint, aboveLine } = this.calcFromPosition(this.canvasRect.x(), this.canvasRect.y(), this.props.width, this.props.height)
    this.props.dispatch(EVENT_BEING_DRAGGED(this.props.id, { distance: (distance < 20 ? 20 : distance), midPoint, aboveLine }))
  }

  render() {
    const { id, type, text, width, height, dispatch } = this.props
    const { x, y, linePoints} = this.calcPosition(this.props)

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
          onDragEnd={this.onDragEnd.bind(this)}
          onClick={() => dispatch(TOGGLE_EDIT_PANEL(type, id))}
        />
        <Line
          points={linePoints}
          stroke={grey800}
          ref={(line) => {this.canvasLine = line}}
        />
      </Group>
    )
  }
}
TextBox = connect()(TextBox)

export default TextBox
