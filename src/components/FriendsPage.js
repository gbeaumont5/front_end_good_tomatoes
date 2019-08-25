import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FriendProfile from './FriendProfile';

const baseURL = 'http://localhost:3003';

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friend: {}, 
      friendID: ''
    };
    this.getFriendProfile = this.getFriendProfile.bind(this);
  }

  componentDidMount() {
    this.getFriends();
  }

  async getFriends() {
    const response = await axios(`${baseURL}/members`);
    const data = response.data;
    this.setState({
      friends: data
    });
  }

  async getFriendProfile(friend) {
    const response = await axios(`${baseURL}/members/${friend._id}`);
    this.setState({
      friend: friend,
    });
    console.log('name' + this.state.friend.name);
    console.log('user id' + this.state.friend._id)
    
  }

  render() {
    return (
      <div>
        <h3>My Friends</h3>
        <div className='row'>
          {this.state.friends.map(friend => {
            return (
              <div className='col s12 m4'>
                <div className='card'>
                  <div
                    onClick={() => this.getFriendProfile(friend)}
                    className='card-image'
                    key={friend._id}
                  >
                    <img alt='profile picture' src={friend.picture} />
                  </div>
                  <div class='card-content'>{friend.name}</div>
                  <div className='card-action'>
                    <div
                      className='btn'
                      onClick={() => this.props.deleteMember(friend._id)}
                    >
                      {' '}
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <FriendProfile friend={this.state.friend} />
      </div>
    );
  }
}

export default FriendsPage;
