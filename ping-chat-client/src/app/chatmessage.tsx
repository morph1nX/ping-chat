import React from 'react';

function ChatMessage(message: any) {

  return (

    <div className="chat-message">

      <p>{message.user}: {message.text}</p>

    </div>

  );

}


export default ChatMessage;