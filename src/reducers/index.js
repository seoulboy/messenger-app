import { combineReducers } from 'redux';

const initialState = {
  chatListData: [],
  isLoading: false,
  currentLocation: null,
  messageList: [],
};

function loadingReducer(state = initialState.isLoading, action) {
  switch (action.type) {
    case 'INITIALIZATION':
      return false;
    case 'LOADING_ON':
      return true;
    default:
      return state;
  }
}

function chatsReducer(state = initialState.chatListData, action) {
  switch (action.type) {
    case 'INITIALIZATION':
      return { ...action.data };
    case 'SEND_MESSAGE':
      const appendedMessageList = {
        ...state.messages,
        [action.messageData.receiver]: state.messages[
          action.messageData.receiver
        ].concat(action.messageData.messageInfo),
      };
      return { ...state, messages: appendedMessageList };
    case 'SET_CURRENT_MESSAGES':
      return action.messageList;
    default:
      return state;
  }
}

function currentLocationReducer(state = initialState.currentLocation, action) {
  switch (action.type) {
    case 'OPEN_CHATROOM':
      return action.location;
    default:
      return state;
  }
}

export default combineReducers({
  chatListData: chatsReducer,
  isLoading: loadingReducer,
  currentLocation: currentLocationReducer,
});
