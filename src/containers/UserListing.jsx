import React, { Component } from 'react';
import { fetchUsers } from '../actions';
import { connect } from 'react-redux';

class UserListing extends Component {

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.users.map(user => {
                const { first_name, last_name, email, id, username, permissions } = user;
                console.log(user)
                return (
                  <tr key={id}>
                    <td>{username}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td>
                      {
                        permissions.map(permission => {
                          return (
                            <span key={permission.id}>{permission.name}</span>
                          )
                        })
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id_token } = state.auth;
  const { users} = state.usersListing;
  return {
    id_token,
    users
  };
}

export default connect(mapStateToProps, { fetchUsers })(UserListing);
