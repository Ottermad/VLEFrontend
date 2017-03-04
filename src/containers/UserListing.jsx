import React, { Component } from 'react';
import { fetchUsers, deleteUser } from '../actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';


class UserListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users || []
    }
  }

  componentWillReceiveProps(props) {
    this.setState({users: props.users || []})
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  deleteUser(user_id, index) {
    this.props.deleteUser(user_id);
    this.state.users.splice(index, 1);
    this.setState(this.state);
  }

  render() {
    let errorDiv = (
      <div>
        {
          this.props.errors.map((error, index) => {
            if (error && error.length > 0) {
              return <ErrorDiv message={error} key={index}/>
            }
            return "";
          })
        }
      </div>
    );

    let successDiv = (
      <div>
        {
          this.props.success.map((success, index) => {
            if (success && success.length > 0) {
              return <SuccessDiv message={success} key={index}/>
            }
            return "";
          })
        }
      </div>
    );
    return (
      <div>
        <h1>Users</h1>
        {errorDiv}
        {successDiv}
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
              this.state.users.map((user, index) => {
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
                    <td>
                      <Link to={`/admin/users/edit/${id}`}>Edit</Link>
                    </td>
                    <td>
                      <button
                        className="btn-small btn-danger btn"
                        onClick={() => this.deleteUser(id, index) }
                      >
                        Delete
                      </button>
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
  const { users } = state.usersListing;
  const { successMessage, errorMessage } = state.userDelete;
  return {
    id_token,
    errors: [errorMessage],
    success: [successMessage],
    users
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UserListing);
