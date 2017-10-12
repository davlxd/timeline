import React from 'react'
import Header from '../../containers/Header'
import Board from '../../containers/Board'
import Footer from '../../components/Footer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey400, grey700 } from 'material-ui/styles/colors'

import './style.scss'

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: grey700,
    rippleColor: grey400
  },
  textField: {
    focusColor: grey700
  }
});

const App = () => (
   <MuiThemeProvider muiTheme={muiTheme}>
     <div className="App">
       <Header />
       <Board />
       <Footer />
     </div>
   </MuiThemeProvider>
)

export default App
