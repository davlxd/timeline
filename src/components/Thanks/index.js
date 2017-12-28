import React from 'react'

import './style.css'

const Thanks = () => (
   <div className='Thanks'>
     <h3>Thanks</h3>
     <p>Timeline.ink is made possible by many wonderful open source projects:</p>
     <ul>
       <li><a href="https://github.com/lavrton/react-konva">React Konva</a>, licensed under <a href="https://github.com/lavrton/react-konva/blob/master/LICENSE">MIT</a>.</li>
       <li><a href="https://konvajs.github.io/">Konvajs</a>, licensed under <a href="https://github.com/konvajs/konva/wiki/License">MIT</a>.</li>
       <li><a href="https://reactjs.org/">React</a>, licensed under <a href="https://github.com/facebook/react#license">MIT</a>.</li>
       <li><a href="https://redux.js.org/">Redux</a>, licensed under <a href="https://redux.js.org/#license">MIT</a>.</li>
       <li><a href="https://wordpress.com/">WordPress</a>, from <a href="https://automattic.com/">Automattic</a>.</li>
       <li><a href="http://www.material-ui.com">Material-UI</a>, licensed under <a href="https://github.com/mui-org/material-ui#license">MIT</a>.</li>
     </ul>
   </div>
)

export default Thanks
