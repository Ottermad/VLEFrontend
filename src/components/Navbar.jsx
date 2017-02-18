import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class Navbar extends Component {
  logOut() {
    this.props.logoutUser()
  }

  render() {
    let logInOrOut = <a>Login</a>;
    if (this.props.isAuthenticated) {
      logInOrOut = <a onClick={() => this.logOut()}>Logout</a>
    }

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">VLE</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>{logInOrOut}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
