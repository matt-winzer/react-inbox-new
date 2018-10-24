import React, { Component } from 'react'
import './App.css'

// Components
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeMessage from './components/ComposeMessage'

class App extends Component {
  state = {
    messages: [],
    unreadCount: ''
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

  toggleSelected = (messageId) => {
    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.selected = !message.selected
      }
      return message
    })
    this.setState({ messages: newMessages })
  }

  markAsRead = () => {
    this.markAsReadOrUnread(true)
  }

  markAsUnread = () => {
    this.markAsReadOrUnread(false)
  }

  addMessage = (message) => {
    const newMessages = this.state.messages.concat(message)
    this.setState({
      messages: newMessages
    })
  }

  markAsReadOrUnread = (readBoolean) => {
    const selectedMessageIds = this.getSelectedMessages()
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        messageIds: selectedMessageIds,
        command: 'read',
        read: readBoolean
      })
    })
      .then(response => response.json())
      .then(newMessages => {
        this.setState({ messages: newMessages })
      })
  }

  getSelectedMessages = () => {
    return this.state.messages.reduce((ids, message) => {
      if (message.selected) {
        ids.push(message.id)
      }
      return ids
    }, [])
  }

  render() {
    return (
      <div className="App">
        <Toolbar  messages={this.state.messages}
                  unreadCount={this.state.unreadCount}
                  markAsRead={this.markAsRead}
                  markAsUnread={this.markAsUnread}
                  />
        <ComposeMessage addMessage={this.addMessage} />
        <MessageList  messages={this.state.messages}
                      toggleStarred={this.toggleStarred}
                      toggleSelected={this.toggleSelected}
                      />
      </div>
    )
  }
}

export default App
