import React from 'react'
import Header from '../../containers/Header'
import Board from '../../containers/Board'
import Footer from '../../components/Footer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './style.scss'

const App = () => (
   <MuiThemeProvider>
     <div className="App">
       <Header />
       <Board />
       <Footer />
     </div>
   </MuiThemeProvider>
)

export default App
