import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { OPEN_FORK_DIALOG } from '../../actions'

import './style.css'

const buttonStyle = {
  zIndex: 1
}

let Header = ({ onForkClick }) => (
  <div className="Header">
    <div className="HeaderButtonGroup">
      <RaisedButton label="Fork" className="Button" buttonStyle={buttonStyle} onClick={onForkClick}/>
      <RaisedButton label="Share" className="Button" buttonStyle={buttonStyle} />
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  onForkClick: () => {
    dispatch(OPEN_FORK_DIALOG)
  },
  onShareClick: (id) => {
    dispatch(OPEN_FORK_DIALOG)
  }
})

Header = connect(
  null,
  mapDispatchToProps,
)(Header)

export default Header
