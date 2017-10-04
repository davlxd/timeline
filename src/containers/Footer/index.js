import React from 'react'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import { grey400 } from 'material-ui/styles/colors';

import './style.css'

const iconStyles = {
  fill: grey400
};

const Footer = () => (
  <div className="Footer">
    <div className="FooterButtonGroup">
      <FloatingActionButton href="mailto: tl@lxd.me" mini={true} backgroundColor="white" iconStyle={iconStyles}>
        <ActionFeedback />
      </FloatingActionButton>
    </div>
  </div>
)

export default Footer
