import React from 'react'
import Paper from 'material-ui/Paper'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style.css'

const style = {
  height: 300,
  width: 533,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const Gallery = () => (
   <div>
     <MuiThemeProvider>
       <div>
         <Paper className="Card" style={style}>
           <span className="CardTitle"> Text </span>
         </Paper>
         <Paper className="Card" style={style}>
           <span className="CardTitle"> Text </span>
         </Paper>
         <Paper className="Card" style={style}>
           <span className="CardTitle"> Text </span>
         </Paper>
         <Paper className="Card" style={style}>
           <span className="CardTitle"> Text </span>
         </Paper>
         <Paper className="Card" style={style}>
           <span className="CardTitle"> Text </span>
         </Paper>
         <Paper className="Card" style={style}>
           <span className="CardTitle"> Text </span>
         </Paper>
       </div>
     </MuiThemeProvider>

   </div>
)

export default Gallery
