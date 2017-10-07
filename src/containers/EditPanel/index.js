import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import './style.css'

const EditPanel = ({ isPaneOpen, onRequestClose }) => (
  <div >
    <SlidingPane
      className="some-custom-class"
      overlayClassName='SlidePaneOverlay'
      isOpen={ isPaneOpen }
      title='Hey, it is optional pane title.  I can be React component too.'
      subtitle='Optional subtitle.'
      width='38.2%'
      onRequestClose={ onRequestClose }
      >
        <div>And I am pane content. BTW, what rocks?</div>
        <br />
    </SlidingPane>
  </div>
)

export default EditPanel
