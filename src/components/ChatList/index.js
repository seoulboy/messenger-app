import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { sortByRecentMsg, changeSortedRecentMsgListToObj } from '../../utils';

const ChatList = ({ chatListData, setCurrentLocation }) => {
  let chatListItems = [];
  setCurrentLocation(null);

  if (
    !(
      Object.entries(chatListData).length === 0 &&
      chatListData.constructor === Object
    )
  ) {
    let sortable = [];
    let sortedMessageData = {};
    for (let user in chatListData.messages) {
      sortable.push([user, chatListData.messages[user]]);
    }

    sortable = sortByRecentMsg(sortable);

    sortedMessageData = changeSortedRecentMsgListToObj(sortable);

    for (let user in sortedMessageData) {
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
                  {sortedMessageData[user][
                    sortedMessageData[user].length - 1
                  ].time.substring(11, 16)}
                </p>
                <p className='chatlist-name'>{user}</p>
                <p className='chatlist-recent-msg-content'>
                  {
                    sortedMessageData[user][sortedMessageData[user].length - 1]
                      .text
                  }
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    }
  }

  return (
    <>
      <div className='new-message-box'>+ New message</div>
      {chatListItems}
    </>
  );
};

export default ChatList;
