import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const ChatList = props => {
  const { chatListData, setCurrentLocation } = props;

  let sortable = [];
  let chatListItems = [];

  for (let user in chatListData.messages) {
    sortable.push([user, chatListData.messages[user]]);
  }

  sortable.sort((a, b) => {
    let aTime = Date.parse(a[1][a[1].length - 1].time);
    let bTime = Date.parse(b[1][b[1].length - 1].time);
    return bTime - aTime;
  });

  chatListData.messages = sortable.reduce((acc, curr, i) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  for (let user in chatListData.messages) {
    chatListItems = chatListItems.concat(
      <Link
        key={user}
        className='chatlist-link'
        to={`/chatlist/${user}`}
        onClick={() => setCurrentLocation(user)}
      >
        <div className='chatlist-item'>
          <img
            className='img-chatList'
            src={chatListData.contacts[user].thumbnail_url}
            alt={`profile_image_${user}`}
          />
          <div className='chatlist-info-container'>
            <div className='chatlist-info'>
              <p className='chatlist-recent-msg-time'>
                {chatListData.messages[user][
                  chatListData.messages[user].length - 1
                ].time.substring(11, 16)}
              </p>
              <p className='chatlist-name'>{user}</p>
              <p className='chatlist-recent-msg-content'>
                {
                  chatListData.messages[user][
                    chatListData.messages[user].length - 1
                  ].text
                }
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div className='new-message-box'>+ New message</div>
      {chatListItems}
    </>
  );
};

export default ChatList;
