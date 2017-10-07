import React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer } from 'react-konva'
import EditPanel from '../EditPanel'
import AxisArrow from '../AxisArrow'

import TextBox from '../../components/TextBox'

let Board = ({ textBoxList }) => {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <AxisArrow />
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
      <EditPanel />
    </div>
  )
}


const getTextBoxList = (state) => {
  state.data.events
  .filter(event => event.type === 'textbox')
  .map((event) => {
    return {
      ...event,
      midpoint: window.innerWidth / 2 + ((event.when - state.data.axisArrow.centralTime) / state.data.axisArrow.centralTime) * 100
    }
  })
}

const mapStateToProps = (state) => ({
  textBoxList: getTextBoxList(state)
})

Board = connect(
  mapStateToProps,
  null
)(Board)


export default Board
