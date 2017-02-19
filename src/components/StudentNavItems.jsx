import React, { Component } from 'react'
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class StudentNavItems extends Component {
  render() {
    return (
      <Nav>
        <LinkContainer to={{ pathname: '/student/homework' }}>
          <NavItem>My Homework</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default StudentNavItems;
