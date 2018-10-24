import React, { Component } from 'react'
import './App.css'

// Components
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'

class App extends Component {
  state = {
    messages: []
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    this.setState({
      messages
    })

    // fetch('http://localhost:8082/api/messages')
    //   .then(res => res.json())
    //   .then(messages => {
    //     console.log(messages)
    //     this.setState({ messages: messages })
    //   })
  }

  toggleStarred = (messageId) => {
    // FETCH PATCH
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        messageIds: [messageId],
        command: 'star'
      })
    })
      .then(response => response.json())
      .then(newMessages => {
        this.setState({
          messages: newMessages
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Toolbar unreadCount={this.state.unreadCount} />
        <MessageList  messages={this.state.messages}
                      toggleStarred={this.toggleStarred} />
      </div>
    )
  }
}

export default App
