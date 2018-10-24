import React, { Component } from 'react'
import './App.css'

// Components
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'

class App extends Component {
  state = {
    messages: [],
    unreadCount: ''
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    const unreadCount = this.calculateUnreadCount(messages)
    this.setState({
      messages,
      unreadCount
    })

    // fetch('http://localhost:8082/api/messages')
    //   .then(res => res.json())
    //   .then(messages => {
    //     console.log(messages)
    //     this.setState({ messages: messages })
    //   })
  }

  calculateUnreadCount = (messages) => {
    const unreadCount = messages.filter(message => {
      return !message.read
    }).length

    return unreadCount
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
    const selectedMessageIds = this.getSelectedMessages()
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        messageIds: selectedMessageIds,
        command: 'read',
        read: true
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
        <Toolbar  unreadCount={this.state.unreadCount}
                  markAsRead={this.markAsRead}
                  />
        <MessageList  messages={this.state.messages}
                      toggleStarred={this.toggleStarred}
                      toggleSelected={this.toggleSelected}
                      />
      </div>
    )
  }
}

export default App
