import React, { Component } from 'react'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class TeacherNavItems extends Component {
  render() {
    return (
      <Nav>
        <LinkContainer to={{ pathname: '/teacher/lessons' }}>
          <NavItem>My Lessons</NavItem>
        </LinkContainer>
        <NavDropdown title="Assign Homework" id="basic-nav-dropdown">
          <LinkContainer to={{ pathname: '/teacher/assign/essay' }}>
            <MenuItem>Assign Essay</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    );
  }
}

export default TeacherNavItems;
