import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      console.log(result.data)
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          First Name: <input type='text' value={this.state.name} onChange={this.handleNameChange} /><br />
          Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
          Password: <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
          <input type='submit' value='Sign Up' />
        </form>
      </div>
    );
  }
}

export default Signup;

// First Name: <input type='text' value={this.state.firstname} onChange={this.handleFirstNameChange} /><br />
// Last Name: <input type='text' value={this.state.lastname} onChange={this.handleLastNameChange} /><br />
// Birthday: <input type='date' value={this.state.birthday} onChange={this.handleBirthdayChange} /><br />
// Street: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
// Unit Number: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
// City: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
// State: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
// Zip: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
// Role Category: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
// Role Type: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
