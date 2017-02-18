import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPerimissionsRequest,fetchPerimissionsError, fetchPerimissionsSuccess ,
  createUser
} from '../actions';

class UserCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      permissions: null
    }
  }

  componentDidMount() {
    this.fetchPermissions()
  }

  fetchPermissions() {
    let config = {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${this.props.id_token}`
      },
    }



    // We dispatch requestLogin to kickoff the call to the API
    this.props.fetchPerimissionsRequest()
    return fetch('http://0.0.0.0:8000/permissions/permission', config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          this.props.fetchPerimissionsError(json.message)
        } else {
          const { permissions } = json;
          this.props.fetchPerimissionsSuccess(permissions)
        }
      })
      .catch(err => console.log("Error: ", err))
  }

  createUser() {
    this.props.createUser(this.state)
  }

  handleSelectChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({permissions: value});
  }

  render() {
    return (
      <div>
        <h2>Create User</h2>
        <span>{this.props.errorMessage}</span>
        <form>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              onChange={event => this.setState({first_name: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
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
          <div className="form-group">
            <label style={{display: 'block'}}>Role(s)</label>
            <select multiple onChange={(e) => this.handleSelectChange(e)}>
            {
              this.props.permissions.map(permission => {
                const { name, id } = permission;
                return (
                  <option value={id} key={id}>{name}</option>
                )
              })
            }
          </select>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {e.preventDefault(); this.createUser()}}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id_token } = state.auth;
  const { permissions } = state.permissionsListing;
  const { errorMessage } = state.userCreate;
  return {
    id_token,
    permissions,
    errorMessage
  };
}


const mapDispatchToProps = {
  fetchPerimissionsRequest, fetchPerimissionsError, fetchPerimissionsSuccess,
  createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreation);
