import React, {Component} from 'react'
import Form from '../Form'

// Dummy data for static version
let data = {
  formState: {
    username: 'juan',
    password: 'secret'
  },
  currentlySending: false
}

class Login extends Component {
  constructor (props) {
    super(props)

    this._login = this._login.bind(this)
  }

  render () {
    let {formState, currentlySending} = data

    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Login</h2>
          </div>
          <Form data={formState} history={this.props.history} onSubmit={this._login} btnText={'Login'} currentlySending={currentlySending} />
        </div>
      </div>
    )
  }

  _login (username, password) {
    return
  }
}

Login.propTypes = {
  history: React.PropTypes.object
}

export default Login
