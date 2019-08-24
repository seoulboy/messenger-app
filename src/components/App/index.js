import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import ChatList from '../ChatList';
import ChatRoom from '../ChatRoom';

class App extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const {
      chatList,
      currentLocation,
      isLoading,
      sendMessageNow,
      setCurrentLocation,
    } = this.props;

    const messagesData = chatList.messages;

    return (
      <div className='App'>
        <div className='current-location'>{currentLocation || 'CHAT'}</div>
        <div className='chat-list-container'>
          <Redirect from='/' to='/chatlist' />
          <Switch>
            <Route
              exact
              path='/chatlist'
              render={() => {
                return (
                  <ChatList
                    setCurrentLocation={setCurrentLocation}
                    chatListData={chatList}
                  />
                );
              }}
            />
            <Route
              path='/chatlist/:user_name'
              render={routeProps => {
                const contactName = routeProps.match.params.user_name;
                return (
                  <ChatRoom
                    onNewMessage={sendMessageNow}
                    messages={messagesData}
                    messageTo={contactName}
                    userProfile={chatList.user_profile}
                    contactProfile={chatList.contacts[contactName]}
                  />
                );
              }}
            />
          </Switch>
          {isLoading && <div className='loading-screen'>I am loading!!!</div>}
        </div>
      </div>
    );
  }
}

export default App;
