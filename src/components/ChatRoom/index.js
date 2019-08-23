import React, { useRef, useEffect } from 'react';
import './index.css';
import { BackButton, SendButton } from '../Buttons';
import { Link } from 'react-router-dom';

const ChatRoom = props => {
  useEffect(() => {
    scrollToBottom();
  });

  const {
    messages,
    onNewMessage,
    messageTo,
    userProfile,
    contactProfile,
  } = props;
  const inputEl = useRef(null);
  const messagesEnd = useRef(null);

  const messageElements = messages
    .sort((a, b) => {
      return a.time - b.time;
    })
    .map((message, index) => {
      return (
        <div className='msg-container' key={`msg-container${index}`}>
          <div
            className={message.is_user_msg ? 'user-msg' : 'other-msg'}
            key={`msg${index}`}
          >
            <p
              className={
                message.is_user_msg ? 'user-msg-time' : 'other-msg-time'
              }
            >
              {message.is_user_msg ? message.time.substring(11, 16) : ''}
            </p>
            <img
              className={
                message.is_user_msg ? 'user-profile-pic' : 'other-profile-pic'
              }
              alt={`profile_pic_${messageTo}`}
              src={
                message.is_user_msg
                  ? userProfile.profile_image
                  : contactProfile.thumbnail_url
              }
            />
            <span className='msg-text'>{message.text}</span>
            <p
              className={
                message.is_user_msg ? 'user-msg-time' : 'other-msg-time'
              }
            >
              {message.is_user_msg ? '' : message.time.substring(11, 16)}
            </p>
          </div>
        </div>
      );
    });

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    inputEl.current.focus();
  };

  const handleSendMessage = () => {
    onNewMessage(inputEl.current.value, messageTo, messages.length);
    inputEl.current.value = '';
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <Link to='/chatlist'>
        <BackButton />
      </Link>
      <div className='chatroom-container'>
        <div className='chat-window'>
          <div className='chat-container'>
            {messageElements}
            <div
              className='dummy-div'
              style={{ float: 'left', clear: 'both' }}
              ref={messagesEnd}
            />
          </div>
        </div>
        <div className='message-input-container'>
          <input
            className='message-input'
            placeholder='Type something to send...'
            type='text'
            ref={inputEl}
            onKeyDown={handleKeyDown}
          />
          <SendButton onClick={handleSendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
