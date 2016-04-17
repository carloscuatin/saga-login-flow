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

class Register extends Component {
  constructor (props) {
    super(props)

    this._register = this._register.bind(this)
  }

  render () {
    let {formState, currentlySending} = data

    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Register</h2>
          </div>
          <Form data={formState} history={this.props.history} onSubmit={this._register} btnText={'Register'} currentlySending={currentlySending} />
        </div>
      </div>
    )
  }

  _register (username, password) {
    return
  }
}

Register.propTypes = {
  history: React.PropTypes.object
}

export default Register
