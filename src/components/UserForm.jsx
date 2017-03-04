import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);

    let permission_ids = []
    if (typeof(props.user.permissions) !== "undefined") {
      permission_ids = props.user.permissions.map(permission => {
        return permission.id;
      });
    }

    this.state = {
      id: props.user.id || null,
      username: props.user.username || '',
      first_name: props.user.first_name || '',
      last_name: props.user.last_name || '',
      email: props.user.email || '',
      password: '',
      permissions: permission_ids || []
    }
  }

  componentWillReceiveProps(props) {
    let permission_ids = []
    if (typeof(props.user.permissions) !== "undefined") {
      permission_ids = props.user.permissions.map(permission => {
        return permission.id;
      });
    }

    this.setState({
      id: props.user.id || null,
      username: props.user.username || '',
      first_name: props.user.first_name || '',
      last_name: props.user.last_name || '',
      email: props.user.email || '',
      password: '',
      permissions: permission_ids
    })
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
    let password = (
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
    );

    if (!this.props.renderPassword) {
      password = (<div></div>)
    }

    return (
      <div>
        <span>{this.props.errorMessage}</span>
        <form>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              value={this.state.first_name}
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
              value={this.state.last_name}
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
              value={this.state.username}
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
              value={this.state.email}
              onChange={event => this.setState({email: event.target.value})}
            />
          </div>
          {password}
          <div className="form-group">
            <label style={{display: 'block'}}>Role(s)</label>
            <select multiple onChange={(e) => this.handleSelectChange(e)} value={this.state.permissions}>
            {

              this.props.permissions.map(permission => {
                const { name, id } = permission;
                // let selected = permission_ids.includes(permission.id)
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
            onClick={(e) => {e.preventDefault(); this.props.callback(this.state)}}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default UserForm;
