import 'babel-polyfill'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import reducer from './reducers'
import rootSaga from './sagas'

import '../css/main.css'

import App from './components/App'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'
import NotFound from './components/pages/NotFound'

let logger = createLogger()

let createStoreWithMiddleware = applyMiddleware(logger, createSagaMiddleware(rootSaga))(createStore)
let store = createStoreWithMiddleware(reducer)

class LoginFlow extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={App}>
            <Route path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<LoginFlow />, document.getElementById('app'))
