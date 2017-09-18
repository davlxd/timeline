import React, { Component } from 'react'
import Header from '../../containers/Header'
import Board from '../../containers/Board'
import EditPanel from '../../containers/EditPanel'
import Footer from '../../containers/Footer'

import './style.css'

const App = () => (
  <div className="App">
    <Header />
    <Board />
    <EditPanel />
    <Footer />
  </div>
)

export default App;
