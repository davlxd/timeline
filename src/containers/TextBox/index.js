import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { Group, Text, Rect, Line } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import { TOGGLE_EDIT_PANEL, UPDATE_TEXT_BOX_HEIGHT, EVENT_DRAGGED } from '../../actions'

import { PIXELS_PER_SCALE } from '../../constants'

import { calcPosition, calcFromPosition } from './positionCalculation'

import DateTimeMarkerOnAxisArrow from '../DateTimeMarkerOnAxisArrow'

import './style.css'

class TextBox extends Component {
  constructor(props) {
    super(props)
    const { when, midPoint, aboveLine } = props
    this.state = {
      showTime: false,
      when,
      midPoint,
      aboveLine
    }
  }

  componentDidMount() {
    if (this.props.height !== this.canvasText.getHeight()) {
      this.props.dispatch(UPDATE_TEXT_BOX_HEIGHT(this.props.id, this.canvasText.getHeight()))
    }
  }

  componentDidUpdate(props) {
    if (props.height !== this.canvasText.getHeight()) {
      props.dispatch(UPDATE_TEXT_BOX_HEIGHT(props.id, this.canvasText.getHeight()))
    }
  }

  onDragMove() {
    const { width, height, scale, centralTime } = this.props
    const { x, y } = { x: this.canvasRect.x(), y: this.canvasRect.y() }
    const { distance, midPoint, aboveLine, when } = calcFromPosition(x, y, width, height, scale, centralTime)
    const { linePoints } = calcPosition({ midPoint, width, height, distance, aboveLine })

    this.setState({
      when,
      midPoint,
      aboveLine
    }) // Has to call setState first, don't know why

    this.canvasText.x(x)
    this.canvasText.y(y)
    this.canvasRect.x(x)
    this.canvasRect.y(y)
    this.canvasLine.points(linePoints)
  }

  onDragEnd() {
    const { width, height, scale, centralTime } = this.props
    const { distance, midPoint, aboveLine } = calcFromPosition(this.canvasRect.x(), this.canvasRect.y(), width, height, scale, centralTime)
    this.props.dispatch(EVENT_DRAGGED(this.props.id, { distance: (distance < 20 ? 20 : distance), midPoint, aboveLine }))
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
    const { id, type, text, width, height, dispatch } = this.props
    const { x, y, linePoints} = calcPosition(this.props)

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
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.when}
          midPoint={this.state.midPoint}
          aboveLine={!this.state.aboveLine}
        />
      </Group>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  scale: state.data.axisArrow.scale,
  centralTime: state.data.axisArrow.centralTime,
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
  midPoint: window.innerWidth / 2 + ((ownProps.when - state.data.axisArrow.centralTime) / state.data.axisArrow.scale) * PIXELS_PER_SCALE
})

TextBox = connect(
  mapStateToProps,
  null
)(TextBox)

export default TextBox
