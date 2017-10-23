import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import { TOGGLE_EDIT_PANEL, UPDATE_TEXT_BOX_HEIGHT, EVENT_BEING_DRAGGED } from '../../actions'

import './style.css'

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTime: false
    }
  }
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

  onMouseOver() {
    this.setState({
      showTime: true
    })
  }
  onMouseOut() {
    this.setState({
      showTime: false
    })
  }

  render() {
    const { id, type, when, midPoint, text, width, height, dispatch } = this.props
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
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Line
          points={linePoints}
          stroke={grey800}
          ref={(line) => {this.canvasLine = line}}
        />
        {(() => {
            if (this.state.showTime) {
              return (
                <Group>
                  <Rect
                    x={midPoint - 70}
                    y={window.innerHeight / 2 + 7}
                    // stroke={grey800}
                    fill='#ffffff'
                    width={140}
                    height={16}
                    cornerRadius={5}
                  />
                  <Text
                    x={midPoint - 70}
                    y={window.innerHeight / 2 + 7}
                    text={new Date(when).toISOString()}
                    fontSize={12}
                    fontFamily='Calibri'
                    fill='#555'
                    width={140}
                    padding={2}
                    align='center'
                  />
                </Group>
               )
            }
          })()}
      </Group>
    )
  }
}
TextBox = connect()(TextBox)

export default TextBox
