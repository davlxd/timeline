import React from 'react'
import { Stage, Layer, Arrow } from 'react-konva'
import { grey800 } from 'material-ui/styles/colors';

import TextBox from '../../components/TextBox'

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
          <TextBox
            text='Do you have some experience/proposals of "games" which you can play with your children, which would be on the one hand would make some fun for them, on the other would somehow develop their logical/thinking/mathematical skills.'
            midpoint={170}
            width={300}
            height={200}
            distance={50}
            aboveLine={true}
          />

          <TextBox
            text='中国共产党第十八次全国代表大会，是在我国改革发展关键阶段召开的一次十分重要的大会。将选举产生新一届中央领导集体。'
            midpoint={500}
            width={200}
            height={160}
            distance={70}
            aboveLine={false}
          />


          <TextBox
            text="It's 2017, and despite all this parallel stuff, query planners are still dumb as bricks. Every day I get annoyed at various obvious-to-the-eye WHERE clause pushdown opportunities, or situations where I can manually copy a view to a table, add indexes, and build a query on top of that quicker than letting the database fill up the entire disk with temporary files trying to do it as a subquery. It's utterly maddening if you spend your life on ad-hoc analytics/reporting workloads. I strongly believe there are huge opportunities for AI to come along and, given a logical description of the data and query, do a better job of physically organising and serving the data. I realise some database management systems do this to an extent, but it's pretty weak sauce in my experience."
            midpoint={900}
            width={600}
            height={240}
            distance={80}
            aboveLine={true}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Board
