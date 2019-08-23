import * as types from '../constants/ActionTypes';
import firebase from 'firebase/app';
import 'firebase/database';

export const openChat = location => ({
  type: types.OPEN_CHATROOM,
  location,
});

export const sendMessage = (message, messageTo, messageId) => {
  const timeNow = new Date();
  firebase
    .database()
    .ref(`messages/${messageTo}`)
    .update({
      [messageId]: {
        is_user_msg: true,
        time: timeNow.toISOString(),
        text: message,
      },
    });
  return {
    type: types.SEND_MESSAGE,
    messageData: {
      receiver: messageTo,
      messageInfo: {
        is_user_msg: true,
        time: timeNow.toISOString(),
        text: message,
      },
    },
  };
};

export const setCurrentMessageList = messageList => ({
  type: types.SET_CURRENT_MESSAGES,
  messageList,
});
