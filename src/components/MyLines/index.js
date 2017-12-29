import React from 'react'
import Paper from 'material-ui/Paper'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style.css'

const MyLines = () => (
   <div>
     <MuiThemeProvider>
       <div className="MyLinesContainer">
         <Paper className="MyLine">
           <img src={process.env.PUBLIC_URL + '/gallery/project2.png'} alt="Project Template"></img>
           <a href="/line/c142e91778da487280c8ceb7c716535b">
             <div className="Veil"><span>Project Template</span></div>
           </a>
         </Paper>

         <Paper className="MyLine">
           <img src={process.env.PUBLIC_URL + '/gallery/self.png'} alt="Timelink.ink"></img>
           <a href="/line/81780cfe11f042178e32d26ad7fc0150">
             <div className="Veil"><span>Timelink.ink</span></div>
           </a>
         </Paper>

        <Paper className="MyLine">
          <img src={process.env.PUBLIC_URL + '/gallery/ww2.png'} alt="World War 2"></img>
          <a href="/line/90bd046febaa4e2f8ae10585deb203fa">
            <div className="Veil"><span>World War 2</span></div>
          </a>
        </Paper>

       </div>
     </MuiThemeProvider>
   </div>
)

export default MyLines
