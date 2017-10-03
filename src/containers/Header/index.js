import React from 'react'
import Button from '../../components/Button'

import './style.css'


const Header = () => (
  <div className="Header">
    <div className="HeaderButtonGroup">
      <Button label="Fork" primary="true" />
      <Button label="Share" secondary="true"/>
    </div>
  </div>
)

export default Header
