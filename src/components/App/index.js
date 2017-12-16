import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../../containers/Header'
import Board from '../../containers/Board'
import Footer from '../../components/Footer'

import { FETCH_LINE } from '../../actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey400, grey700 } from 'material-ui/styles/colors'

import './style.scss'

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: grey700,
    rippleColor: grey400
  },
  checkbox: {
    boxColor: grey700,
    checkedColor: grey700
  },
  textField: {
    focusColor: grey700
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch(FETCH_LINE(this.props.match.params.id))
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

App = connect(
  null,
  null
)(App)
export default App
