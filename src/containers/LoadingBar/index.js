import React from 'react'
import { connect } from 'react-redux'

import './style.css'

let LoadingBar = ({ display }) => (
  <div className={ display ? 'LoadingBar' : 'LoadingBarNotDisplay'}> </div>
)

const mapStateToProps = (state) => ({
  display: state.ui.restRequest.isFetching
})

LoadingBar = connect(
  mapStateToProps,
  null,
)(LoadingBar)

export default LoadingBar
