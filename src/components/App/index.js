import React, { Component } from 'react'
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

class App extends Component {
  componentDidMount() {
    console.log(this.props)
    console.log('id: ' + this.props.match.params.id)
    console.log('view: ' + this.props.match.path.startsWith('/view'))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Header />
          <Board />
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
