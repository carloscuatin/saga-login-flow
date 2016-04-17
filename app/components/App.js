import React, {Component} from 'react'
import Nav from './Nav'

class App extends Component {
  render () {
    return (
      <div className='wrapper'>
        <Nav history={this.props.history} location={this.props.location} />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  children: React.PropTypes.object
}

export default App
