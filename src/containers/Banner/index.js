import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.css'

class Banner extends Component {
  constructor(props) {
    super(props)
    this.historyMessageList = []
  }

  componentWillUpdate({ message }) {
    this.historyMessageList.push(message)
    console.log(this.historyMessageList)
  }

  render() {
    return (
      <div>
        {
          this.historyMessageList.filter(msg => !!msg).map((msg, index) =>
            <div key ={index} className='BannerMessage'>
              {msg}
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.data.axisArrow,
  message: state.ui.banner.message
})

Banner = connect(
  mapStateToProps,
  null,
)(Banner)


export default Banner
