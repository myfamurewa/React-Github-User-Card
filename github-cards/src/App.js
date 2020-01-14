import React from 'react';
import logo from './logo.svg';
import {render} from 'react-dom'
import axios from 'axios'
import GitHubCard from './components/GitHubCard'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      follower: []
    }
  }
  componentDidMount() {
    axios.get(`https://api.github.com/users/viscountfam`)
      .then(response => {
        console.log("User Response", response)
        this.setState({
          user: response.data
        })
      })
      .catch(err => {
        console.log("An error has occurred", err)
      })
    axios.get('https://api.github.com/users/viscountfam/followers')
    .then(response => {
      console.log("follower initial response", response);
      response.data.forEach(item => {
        axios.get( `https://api.github.com/users/${item.login}`)
      .then(res => {
      console.log("follower full response set", this.state.follower);
      this.setState({
        follower: [...this.state.follower, res.data]
      })
    });
      })
    })
  }

  render() {
  return (
    <div className="container">
    <div className="cards">
    <GitHubCard user={this.state.user} />
    {this.state.follower.map(user => (
      <GitHubCard key={user.id} user={user} />
    ))}
    </div>
    </div>
  );
  }
}

export default App;
