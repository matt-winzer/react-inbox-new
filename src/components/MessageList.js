import React from 'react'

// Components
import Message from './Message'

const MessageList = ({ messages, toggleStarred, toggleSelected }) => {
  const messageComponents = messages.map(message => {
    return <Message key={message.id}
                    id={message.id}
                    labels={message.labels}
                    read={message.read}
                    selected={message.selected}
                    starred={message.starred}
                    subject={message.subject}
                    toggleStarred={toggleStarred}
                    toggleSelected={toggleSelected} />
  })

  return (
    <div>
      {messageComponents}
    </div>
  )
}

export default MessageList