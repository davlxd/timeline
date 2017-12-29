import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey400, grey700, grey800 } from 'material-ui/styles/colors'

import './style.css'

const muiTheme = getMuiTheme({
  textField: {
    focusColor: grey700
  },
  flatButton: {
    primaryTextColor: grey800,
    secondaryTextColor: grey400
  }
})

const LogIn = () => (
   <div>
     <MuiThemeProvider muiTheme={muiTheme}>
       <div className="LogInPage">
         <Paper className="LogInPaper">
           <TextField hintText="Email address" floatingLabelText="Email address"/><br />
           <TextField hintText="Password" floatingLabelText="Password" type="password"/><br /><br /><br />
           <RaisedButton label="Log In" />
         </Paper>
       </div>
     </MuiThemeProvider>
   </div>
)

export default LogIn
