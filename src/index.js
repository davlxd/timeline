import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import { Route } from 'react-router'

import registerServiceWorker from './registerServiceWorker'

import Home from './components/Home'
import Gallery from './components/Gallery'
import App from './components/App'
import GenericNotFound from './components/GenericNotFound'
import './index.css'


render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/gallery" component={Gallery}/>
          <Route exact path="/line/:id" component={App}/>
          <Route exact path="/view/:id" component={App}/>
          <Route component={GenericNotFound} />
        </div>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
