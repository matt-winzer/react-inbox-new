import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    fetch('/messages.json')
      .then(res => res.json())
      .then(messages => {
        console.log(messages)
        this.setState({ messages })
      })
  }

  render() {
    return (
      <div className="App">

      </div>
    )
  }
}

export default App
