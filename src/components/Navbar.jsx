import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import TeacherNavItems from './TeacherNavItems';
import AdminNavItems from './AdminNavItems';
import StudentNavItems from './StudentNavItems';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class MainNavbar extends Component {
  logOut() {
    this.props.logoutUser()
  }

  render() {
    console.log(this.props)
    let logInOrOut = (
      <Nav>
        <LinkContainer to={{ pathname: '/login' }}>
          <NavItem>Login</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/signup' }}>
          <NavItem>Sign Up</NavItem>
        </LinkContainer>
      </Nav>
    );
    if (this.props.isAuthenticated) {
      logInOrOut = (
        <Nav>
          <NavItem onClick={() => this.logOut()}>Logout</NavItem>
        </Nav>
      )
    }

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            VLE
          </Navbar.Brand>
        </Navbar.Header>
        { this.props.isAuthenticated ? <Nav><LinkContainer to="/home"><NavItem>Home</NavItem></LinkContainer></Nav> : ""}
        {
          this.props.currentUser.isTeacher ? <TeacherNavItems /> : ""
        }
        {
          this.props.currentUser.isAdmin ? <AdminNavItems /> : ""
        }
        {
          this.props.currentUser.isStudent ? <StudentNavItems /> : ""
        }
        {logInOrOut}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const isAuthenticated = state.auth.isAuthenticated;
  const currentUser = state.fetchCurrentUserDetails.user;
  return {
    isAuthenticated,
    currentUser
  }
}

export default connect(mapStateToProps, { logoutUser })(MainNavbar);
