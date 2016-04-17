import React, {Component} from 'react'
import LoadingButton from './LoadingButton'

let assign = Object.assign

class Form extends Component {
  render () {
    return (
      <form className='form' onSubmit={this._onSubmit.bind(this)}>
        <div className='form__error-wrapper'>
          <p className='form__error form__error--username-taken'>
            Sorry, but this username is already taken.
          </p>
          <p className='form__error form__error--username-not-registered'>
            This username does not exist.
          </p>
          <p className='form__error form__error--wrong-password'>
            Wrong password.
          </p>
          <p className='form__error form__error--field-missing'>
            Please fill out the entire form.
          </p>
          <p className='form__error form__error--failed'>
            Something went wrong, please try again!
          </p>
        </div>
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            type='text'
            id='username'
            value={this.props.data.username}
            placeholder='frank.underwood'
            onChange={this._changeUsername.bind(this)}
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false' />
          <label className='form__field-label' htmlFor='username'>
            Username
          </label>
        </div>
        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            id='password'
            type='password'
            value={this.props.data.password}
            placeholder='••••••••••'
            onChange={this._changePassword.bind(this)} />
          <label className='form__field-label' htmlFor='password'>
            Password
          </label>
        </div>
        <div className='form__submit-btn-wrapper'>
          {this.props.currentlySending ? (
             <LoadingButton />
             ) : (
             <button className='form__submit-btn' type='submit'>
               {this.props.btnText}
             </button>
             )}
        </div>
      </form>
    )
  }

  _changeUsername (event) {
    let newState = this._mergeWithCurrentState({
      username: event.target.value
    })

    this._emitChange(newState)
  }

  _changePassword (event) {
    let newState = this._mergeWithCurrentState({
      password: event.target.value
    })

    this._emitChange(newState)
  }

  _mergeWithCurrentState (change) {
    return assign(this.props.data, change)
  }

  // For later
  // _emitChange (newState) {
  //   this.props.dispatch(changeForm(newState))
  // }

  _onSubmit (evt) {
    evt.preventDefault()
    this.props.onSubmit(this.props.data.username, this.props.data.password)
  }
}

Form.propTypes = {
  onSubmit: React.PropTypes.func,
  btnText: React.PropTypes.string,
  data: React.PropTypes.object,
  currentlySending: React.PropTypes.Bool,
  changeForm: React.PropTypes.Func
}

export default Form
