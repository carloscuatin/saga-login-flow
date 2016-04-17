import React, {Component} from 'react'
import {Link} from 'react-router'

class Nav extends Component {
  render () {
    let navButtons = (
      <div>
        <Link to='/register' className='btn btn--login btn--nav'>Register</Link>
        <Link to='/login' className='btn btn--login btn--nav'>Login</Link>
      </div>
    )

    return (
      <div className='nav'>
        <div className='nav__wrapper'>
          <Link to='/' className='nav__logo-wrapper'><h1 className='nav__logo'>Login&nbsp;Flow</h1></Link>
          {navButtons}
        </div>
      </div>
    )
  }
}

export default Nav
