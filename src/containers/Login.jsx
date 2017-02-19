import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLogin, loginError, receiveLogin, fetchCurrentUserDetails } from '../actions';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  loginUser(e) {
    e.preventDefault();
    const { username, password } = this.state

    if (username ===  "" || password === "") {
      this.props.loginError("Username and password can't be blank.");
      return
    }

    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }

    // We dispatch requestLogin to kickoff the call to the API
    this.props.requestLogin({ username, password })
    return fetch('http://0.0.0.0:8000/auth', config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          this.props.loginError(json.message)
        } else {
          const { access_token } = json;
          localStorage.setItem('id_token', access_token);
          this.props.receiveLogin(access_token)
          this.props.fetchCurrentUserDetails()
          browserHistory.replace("/home")
        }
      })
      .catch(err => console.log("Error: ", err))

      //       .then(({ user, response }) =>  {
      //   if (!response.ok) {
      //     // If there was a problem, we want to
      //     // dispatch the error condition
      //     console.log(user, response)
      //     this.props.loginError(user.message)
      //     return Promise.reject(user)
      //   } else {
      //     // If login was successful, set the token in local storage
      //     localStorage.setItem('id_token', user.access_token)
      //     // Dispatch the success action
      //     this.props.receiveLogin(user)
      //     browserHistory.push("/home")
      //   }
      // })
  }

  render() {
    return (
      <div className="jumbotron">
        <h2 style={{textAlign: 'center'}}>Login</h2>
        <span>{this.props.errorMessage}</span>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={event => this.setState({username: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={event => this.setState({password: event.target.value})}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={this.loginUser.bind(this)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
};

function mapStateToProps(state) {
  console.log("STATE FROM MAP", state)
  const { errorMessage } = state.auth;
  return {
    errorMessage
  }
}

export default connect(mapStateToProps, { loginError, requestLogin, receiveLogin, fetchCurrentUserDetails })(Login);
