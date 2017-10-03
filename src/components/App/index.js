import React from 'react'
import Header from '../../containers/Header'
import Board from '../../containers/Board'
import EditPanel from '../../containers/EditPanel'
import Footer from '../../containers/Footer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style.scss'

const App = () => (
   <MuiThemeProvider>
     <div className="App">
       <Header />
       <Board />
       <EditPanel />
       <Footer />
     </div>
   </MuiThemeProvider>
)

export default App
