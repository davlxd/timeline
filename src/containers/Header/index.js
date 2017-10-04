import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import './style.css'


const Header = () => (
  <div className="Header">
    <div className="HeaderButtonGroup">
      <RaisedButton label="Fork" className="Button" />
      <RaisedButton label="Share" className="Button" />
    </div>
  </div>
)

export default Header
