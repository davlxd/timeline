import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import './style.css'

const buttonStyle = {
  zIndex: 1
}

const Header = () => (
  <div className="Header">
    <div className="HeaderButtonGroup">
      <RaisedButton label="Fork" className="Button" buttonStyle={buttonStyle} />
      <RaisedButton label="Share" className="Button" buttonStyle={buttonStyle} />
    </div>
  </div>
)

export default Header
