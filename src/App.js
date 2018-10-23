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
        this.setState({ messages })
      })
  }

  toggleStarred = (event, messageId) => {
    event.preventDefault()

    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.starred = !message.starred
      }
      return message
    })

    this.setState({
      messages: newMessages
    })
  }

  render() {
    return (
      <div className="App">
        <MessageList  messages={this.state.messages}
                      toggleStarred={this.toggleStarred} />
      </div>
    )
  }
}

export default App
