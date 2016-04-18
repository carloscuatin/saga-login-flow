import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from '../Form'

class Register extends Component {
  constructor (props) {
    super(props)

    this._register = this._register.bind(this)
  }

  render () {
    let {dispatch} = this.props
    let {formState, currentlySending} = this.props.data

    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Register</h2>
          </div>
          <Form data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._register} btnText={'Register'} currentlySending={currentlySending} />
        </div>
      </div>
    )
  }

  _register (username, password) {
    return
  }
}

Register.propTypes = {
  data: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Register)
