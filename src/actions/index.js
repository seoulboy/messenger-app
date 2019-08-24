import { sendMessage_FirebaseAPI } from '../api';

import * as types from '../constants/ActionTypes';

export const initialization = data => ({
  type: types.INITIALIZATION,
  data,
});

export const openChat = location => ({
  type: types.OPEN_CHATROOM,
  location,
});

export const onLoading = () => ({
  type: types.LOADING,
});

export const sendMessage = (message, messageTo, messageId) => {
  sendMessage_FirebaseAPI(message, messageTo, messageId);
  return {
    type: types.SEND_MESSAGE,
    messageData: {
      receiver: messageTo,
      messageInfo: {
        is_user_msg: true,
        time: new Date().toISOString(),
        text: message,
      },
    },
  };
};

export const setCurrentMessageList = messageList => ({
  type: types.SET_CURRENT_MESSAGES,
  messageList,
});
