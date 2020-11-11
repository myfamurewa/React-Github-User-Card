import React from 'react';
import axios from 'axios'
import GitHubCard from './components/GitHubCard'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      follower: [],
      userText: "",
      guestUser: [],
      guestfollower: []
    }
  }

  findUser = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userText}`)
    .then(res =>
      this.setState({
        guestUser: res.data
      })
      )
      axios.get(`https://api.github.com/users/${this.state.userText}/followers`)
    .then(response => {
      console.log("guest follower initial response", response);
      response.data.forEach(item => {
        axios.get( `https://api.github.com/users/${item.login}`)
      .then(res => {
      console.log(" guest follower full response set", this.state.follower);
      this.setState({
        guestfollower: [...this.state.guestfollower, res.data]
      })
    });
      })
    })
  }

  handleChanges = e => {
    this.setState({
      userText: e.target.value
    });
  };

  render() {
  return (
    <div className="container">
      <h1>Enter a github</h1>
      <input
          type="text"
          value={this.state.userText}
          onChange={this.handleChanges}
        />
      <button onClick={this.findUser}>find user</button>
    <div className="cards">
    <GitHubCard className="guest" user={this.state.guestUser} />
    {this.state.follower.map(user => (
      <GitHubCard key={user.id} user={user} />
    ))}
    {this.state.guestfollower.map(user => (
      <GitHubCard className="guest" key={user.id} user={user} />
    ))}
    </div>
    </div>
  );
  }
}

export default App;
