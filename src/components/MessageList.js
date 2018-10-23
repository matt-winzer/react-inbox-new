import React from 'react'

// Components
import Message from './Message'

const MessageList = ({ messages, toggleStarred }) => {
  const messageComponents = messages.map(message => {
    return <Message key={message.id}
                    id={message.id}
                    labels={message.labels}
                    read={message.read}
                    selected={message.selected}
                    starred={message.starred}
                    subject={message.subject}
                    body={message.body}
                    toggleStarred={toggleStarred} />
  })

  return (
    <div>
      {messageComponents}
    </div>
  )
}

export default MessageList