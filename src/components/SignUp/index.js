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

const SignUp = () => (
   <div>
     <MuiThemeProvider muiTheme={muiTheme}>
       <div className="SignUpPage">
         <Paper className="SignUpPaper">
           <TextField hintText="Display name" floatingLabelText="Display name"/><br />
           <TextField hintText="Email address" floatingLabelText="Email address"/><br />
           <TextField hintText="Password" floatingLabelText="Password" type="password"/><br /><br /><br />
           <RaisedButton label="Sign Up" />
         </Paper>
       </div>
     </MuiThemeProvider>
   </div>
)

export default SignUp
