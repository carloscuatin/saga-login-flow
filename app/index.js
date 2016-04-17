import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'

import '../css/main.css'

import App from './components/App'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import NotFound from './components/pages/NotFound'

class LoginFlow extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Route>
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}

ReactDOM.render(<LoginFlow />, document.getElementById('app'))
