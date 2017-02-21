import React, { Component } from 'react'
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class AdminNavItems extends Component {
  render() {
    return (
      <Nav>
        <NavDropdown title="Users" id="basic-nav-dropdown">
          <LinkContainer to={{ pathname: '/admin/users' }}>
            <MenuItem>View All Users</MenuItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/admin/users/create' }}>
            <MenuItem>Add A User</MenuItem>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown title="Subjects" id="basic-nav-dropdown">
          <LinkContainer to={{ pathname: '/admin/subjects' }}>
            <MenuItem>View All Subjects</MenuItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/admin/subjects/create' }}>
            <MenuItem>Add A Subject</MenuItem>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown title="Classes" id="basic-nav-dropdown">
          <LinkContainer to={{ pathname: '/admin/lessons' }}>
            <MenuItem>View All Classes</MenuItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/admin/lessons/create' }}>
            <MenuItem>Add A Class</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    );
  }
}

export default AdminNavItems;
