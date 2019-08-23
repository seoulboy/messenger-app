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
    return (
      <div className='App'>
        <div className='current-location'>
          {this.props.currentLocation || 'CHAT'}
        </div>
        <div className='chat-list-container'>
          <Redirect from='/' to='/chatlist' />
          <Switch>
            <Route
              exact
              path='/chatlist'
              render={() => {
                this.props.setCurrentLocation(null);
                return (
                  <ChatList
                    setCurrentLocation={this.props.setCurrentLocation}
                    chatListData={this.props.chatList}
                  />
                );
              }}
            />
            <Route
              path='/chatlist/:user_name'
              render={routeProps => {
                const contactName = routeProps.match.params.user_name;
                if (this.props.chatList.messages) {
                  return (
                    <ChatRoom
                      onNewMessage={this.props.sendMessageNow}
                      messages={this.props.chatList.messages[contactName]}
                      messageTo={contactName}
                      userProfile={this.props.chatList.user_profile}
                      contactProfile={this.props.chatList.contacts[contactName]}
                    />
                  );
                }
              }}
            />
          </Switch>
          {this.props.isLoading && (
            <div className='loading-screen'>I am loading!!!</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
