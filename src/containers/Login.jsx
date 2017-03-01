import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';

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
    this.props.loginUser(this.state);
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
  const { errorMessage } = state.auth;
  return {
    errorMessage
  }
}

export default connect(mapStateToProps, { loginUser })(Login);
