import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'

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

const updateLine = (id, data, unauthorizedCallback) => {
  fetch(
    `https://5kcqqq1fc7.execute-api.ap-southeast-2.amazonaws.com/beta/timelines/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(error))
}


class App extends Component {
  componentDidMount() {
    this.props.dispatch(FETCH_LINE(this.props.match.params.id))
    Rx.Observable.from(this.context.store)
      .map(state => state.data)
      .distinctUntilChanged()
      .debounceTime(2000)
      .subscribe(data => updateLine(this.props.match.params.id, data))
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
App.contextTypes = { store: PropTypes.object }

App = connect(
  null,
  null
)(App)


export default App
