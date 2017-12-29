import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router'

import store, { history } from './store'

import registerServiceWorker from './registerServiceWorker'

import Home from './components/Home'
import Gallery from './components/Gallery'
import App from './components/App'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import MyAccount from './components/MyAccount'
import MyLines from './components/MyLines'
import GenericNotFound from './components/GenericNotFound'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'
import Thanks from './components/Thanks'

import './index.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={LogIn}/>
          <Route exact path="/my/lines" component={MyLines}/>
          <Route exact path="/my/account" component={MyAccount}/>
          <Route exact path="/gallery" component={Gallery}/>
          <Route exact path="/line/:id" component={App}/>
          <Route exact path="/view/:id" component={App}/>
          <Route exact path="/terms" component={TermsOfService}/>
          <Route exact path="/privacy" component={PrivacyPolicy}/>
          <Route exact path="/thanks" component={Thanks}/>
          <Route component={GenericNotFound} />
        </Switch>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
