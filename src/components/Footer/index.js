import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionFeedback from 'material-ui/svg-icons/action/feedback'
import { grey400 } from 'material-ui/styles/colors'

import './style.css'

const iconStyles = {
  fill: grey400
}

const Footer = () => (
  <div className="Footer">
    <div className="FooterButtonGroup">
      <FloatingActionButton href="mailto: feedback@timeline.ink" mini={true} backgroundColor="white" iconStyle={iconStyles}>
        <ActionFeedback />
      </FloatingActionButton>
    </div>
  </div>
)

export default Footer
