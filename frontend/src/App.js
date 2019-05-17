import React from 'react';
import logo from './logo.svg';
import FancyDiv from './components/FancyDiv.js'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: 0,
      word: '',
      palindrome: '',
      users: []
    }
    this.getData = this.getData.bind(this);
    this.getData();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getData() {
    fetch('http://localhost:3001/user'+this.state.word)
    .then((res) => res.text())
    .then((res) => {
      const data = JSON.parse(res);
      this.setState({users: data})
      // console.log(this.state.palindrome)
    })
  }


  handleChange(event) {
    if(event.target.id === 'word')
      this.setState({word: event.target.value})
    else if(event.target.id === 'name')
      this.setState({name: event.target.value})
    else if(event.target.id === 'age')
      this.setState({age: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.id)
    if(event.target.id === "palindrome") {
      fetch('http://localhost:3001/?word='+this.state.word)
      .then((res) => res.text())
      .then((res) => {
        const data = JSON.parse(res).palindrome;
        console.log(data);
        this.setState({palindrome: data})
        console.log(this.state.palindrome)
      })
    } else if(event.target.id === 'user') {
      fetch('http://localhost:3001/user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: this.state.name, age: this.state.age})
      },
      ).then((res) => res.text())
      .then((res) => {
          this.getData()
      })
    }
  }

  render() {
      return (
        <div className="App">
          <FancyDiv name="Palindrome">
            <form id="palindrome" onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} id="word" type="text" />
              <input type="submit" value="Submit"/>
            </form>
            <div>
              {this.state.palindrome}
            </div>
          </FancyDiv>
          <FancyDiv name="Users">
            <form id="user" onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} id="name" type="text" />
              <input onChange={this.handleChange} id="age" type="number" />
              <input type="submit" value="Submit"/>
            </form>
            <div>
              <ul>
                {this.state.users.map(user => 
                  <li>{user.name} - {user.age}</li>
                )}
              </ul>
            </div>
          </FancyDiv>
        </div>
      );
    }
  }

export default App;
