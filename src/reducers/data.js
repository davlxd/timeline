const initialState = {
  axisArrow: {
    centralTime: new Date().getTime(),
    lineWidth: 4,
    scale: 86400000
  },
  nextEventId: 4,
  events: [
    {
      id: 1,
      when: (new Date().getTime() - 86400000 * 5),
      type: 'textbox',
      text: 'Do you have some experience/proposals of "games" which you can play with your children, which would be on the one hand would make some fun for them, on the other would somehow develop their logical/thinking/mathematical skills.',
      width: 300,
      height: 200, // should be calc
      distance: 50,
      aboveLine: true
    },
    {
      id: 2,
      when: (new Date().getTime() - 86400000 * 1),
      type: 'textbox',
      text: '中国共产党第十八次全国代表大会，是在我国改革发展关键阶段召开的一次十分重要的大会。将选举产生新一届中央领导集体。',
      width:200,
      height:160, // should be calc
      distance:70,
      aboveLine:false
    },
    {
      id: 3,
      when: (new Date().getTime() + 86400000 * 2.5),
      type: 'textbox',
      text: "It's 2017, and despite all this parallel stuff, query planners are still dumb as bricks. Every day I get annoyed at various obvious-to-the-eye WHERE clause pushdown opportunities, or situations where I can manually copy a view to a table, add indexes, and build a query on top of that quicker than letting the database fill up the entire disk with temporary files trying to do it as a subquery. It's utterly maddening if you spend your life on ad-hoc analytics/reporting workloads. I strongly believe there are huge opportunities for AI to come along and, given a logical description of the data and query, do a better job of physically organising and serving the data. I realise some database management systems do this to an extent, but it's pretty weak sauce in my experience.",
      width: 600,
      height: 240, // should be calc
      distance: 80,
      aboveLine: true
    }
  ]
}

// calculate the scale

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'TEXT_ON_TEXT_BOX_EDITOR_CHANGE':
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id !== action.id) return event
          return {
            ...event,
            text: action.text
          }
        })
      }
    case 'UPDATE_TEXT_BOX_HEIGHT':
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id !== action.id) return event
          return {
            ...event,
            height: action.height
          }
        })
      }
    default:
      return state
  }
}

export default data
