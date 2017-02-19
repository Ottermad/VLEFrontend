import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import TeacherNavItems from './TeacherNavItems';
import AdminNavItems from './AdminNavItems';
import StudentNavItems from './StudentNavItems';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class MainNavbar extends Component {
  logOut() {
    this.props.logoutUser()
  }

  render() {
    console.log(this.props)
    let logInOrOut = <NavItem>Login</NavItem>;
    if (this.props.isAuthenticated) {
      logInOrOut = <NavItem onClick={() => this.logOut()}>Logout</NavItem>
    }

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            VLE
          </Navbar.Brand>
        </Navbar.Header>
        {
          this.props.currentUser.isTeacher ? <TeacherNavItems /> : ""
        }
        {
          this.props.currentUser.isAdmin ? <AdminNavItems /> : ""
        }
        {
          this.props.currentUser.isStudent ? <StudentNavItems /> : ""
        }
        <Nav>
          {logInOrOut}
        </Nav>
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
