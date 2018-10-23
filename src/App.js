import React, { Component } from 'react'
import './App.css'

// Components
import MessageList from './components/MessageList'

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
        <MessageList messages={this.state.messages} />
      </div>
    )
  }
}

export default App
