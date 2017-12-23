import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Rx from 'rxjs/Rx'

import Header from '../../containers/Header'
import Board from '../../containers/Board'
import Footer from '../../components/Footer'
import Banner from '../../containers/Banner'
import ForkDialog from '../../containers/ForkDialog'
import ShareDialog from '../../containers/ShareDialog'

import { FETCH_LINE, UPDATE_LINE } from '../../actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey400, grey700, grey800 } from 'material-ui/styles/colors'

import './style.scss'

const muiTheme = getMuiTheme({
  // fontFamily: 'Calibri',
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
  },
  flatButton: {
    primaryTextColor: grey800,
    secondaryTextColor: grey400
  }
})

class App extends Component {
  componentDidMount() {
    this.props.dispatch(FETCH_LINE(this.props.match.params.id))
    Rx.Observable.from(this.context.store)
      .map(state => state.data)
      .distinctUntilChanged()
      .debounceTime(2000)
      .subscribe(data => this.props.dispatch(UPDATE_LINE(this.props.match.params.id, data)))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Banner />
          <Header />
          <ForkDialog />
          <ShareDialog />
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
