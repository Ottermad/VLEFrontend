import React, { Component } from 'react';
import UserForm from '../components/UserForm';
import { connect } from 'react-redux';
import { fetchUserDetail, editUser } from '../actions/user';
import { fetchPermissions } from '../actions/permissions';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';

class UserEdit extends Component {

  componentWillMount() {
    this.props.fetchUserDetail(this.props.params.id)
    this.props.fetchPermissions()
  }

  editUser(user) {
    // Remove password
    if (user.password === "") {
      delete user.password;
    }
    user.old_permissions = this.props.user.permissions.map(permission => {
      return permission.id.toString();
    });
    this.props.editUser(user)
    // console.log(user)
    // console.log(this.props)
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

    let successDiv = (this.props.successMessage && this.props.successMessage.length > 0) ?
      <SuccessDiv message={this.props.successMessage}/> : ""

    return (
      <div>
        <h2>Edit User</h2>
        {successDiv}
        {errorDiv}
        <UserForm
          callback={this.editUser.bind(this)}
          permissions={this.props.permissions}
          errorMessage={this.props.errorMessage}
          user={this.props.user}
          renderPassword
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { permissions } = state.permissionsListing;
  const userEditError = state.userEdit.errorMessage;
  const { successMessage } = state.userEdit;
  const { user } = state.fetchUser;
  const grantPermissionError = state.grantPermission.errorMessage;
  const revokePermissionError = state.revokePermission.errorMessage;
  return {
    permissions,
    errors: [userEditError, grantPermissionError, revokePermissionError],
    successMessage,
    user
  };
}


const mapDispatchToProps = {
  fetchPermissions,
  fetchUserDetail,
  editUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
