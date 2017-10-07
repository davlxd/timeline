import React from 'react'
import { Stage, Layer, Group, Arrow } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';


class Board extends React.Component {
  state = { color: 'green' };

  handleClick = () => {
    // window.Konva is a global variable for Konva framework namespace
    this.setState({
      color: window.Konva.Util.getRandomColor()
    });
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Arrow
            x={0}
            y={window.innerHeight / 2}
            points={[0,0, window.innerWidth, 0]}
            pointerLength={20}
            pointerWidth={20}
            fill={grey800}
            stroke={grey800}
            strokeWidth={4}
          />
        </Layer>
      </Stage>

    );
  }
}

export default Board
