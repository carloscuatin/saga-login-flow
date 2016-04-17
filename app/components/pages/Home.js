import React, {Component} from 'react'
import Nav from '../Nav'

class Home extends Component {
  render () {
    return (
      <article>
        <div>
          <section className='text-section'>
            <h1>Welcome to Login Flow!</h1>
            <p>This application demonstrates what a React-based register/login workflow might look like with <a href='https://github.com/yelouafi/redux-saga'>redux-saga</a>.</p>
              <Nav />
          </section>
          <section className='text-section'>
            <h2>Features</h2>
            <ul>
              <li>
                <p>Features will go here :-)</p>
              </li>
            </ul>
          </section>
        </div>
      </article>
    )
  }
}

export default Home
