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
import GenericNotFound from './components/GenericNotFound'
import './index.css'


render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/gallery" component={Gallery}/>
          <Route exact path="/line/:id" component={App}/>
          <Route exact path="/view/:id" component={App}/>
          <Route component={GenericNotFound} />
        </Switch>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
