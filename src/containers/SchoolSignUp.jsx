import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import { browserHistory } from 'react-router';

class SchoolSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      school_name: ''
    }
  }

  createSchool(e) {
    e.preventDefault();
    this.props.signUp(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if (!(nextProps.hasFailed) && !(nextProps.isFetching)) {
      browserHistory.replace("/login")
    }
  }

  render() {
    console.log(this.props)
    let errorDiv;
    if (!(this.props.isFetching) & this.props.hasFailed) {
      errorDiv = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      )
    }

    return (
      <div>
        <h1>Sign Up</h1>
        {errorDiv}
        <form>
          <div className="form-group">
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              placeholder="School Name"
              className="form-control"
              onChange={event => this.setState({school_name: event.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Your First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              onChange={event => this.setState({first_name: event.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Your Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              onChange={event => this.setState({last_name: event.target.value})}
            />
          </div>
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={event => this.setState({email: event.target.value})}
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
            onClick={(e) => {this.createSchool(e)}}
          >
          Sign Up
        </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, isFetching, hasFailed } = state.signUp;
  return { errorMessage, isFetching, hasFailed };
}

export default connect(mapStateToProps, { signUp })(SchoolSignUp);
