import { connect } from 'react-redux';
import App from '../components/App';
import { getChats } from '../api';
import { openChat, sendMessage, setCurrentMessageList } from '../actions';

const mapStateToProps = state => {
  return {
    chatList: state.chatListData,
    isLoading: state.isLoading,
    currentLocation: state.currentLocation,
    messageList: state.messageList,
  };

  // 여기선 store의 state를 App의 prop과 mapping해줌.
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad() {
      dispatch({
        type: 'LOADING_ON',
      });
      getChats().then(data => {
        dispatch({
          type: 'INITIALIZATION',
          data,
        });
      });
    },
    setCurrentLocation(location) {
      dispatch(openChat(location));
    },
    sendMessageNow(message, messageTo, messageId) {
      dispatch(sendMessage(message, messageTo, messageId));
    },
    setMessageList(messageList) {
      dispatch(setCurrentMessageList(messageList));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
