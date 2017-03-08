import React, { Component } from 'react';

class AdminInfo extends Component {
  render() {
    return (
      <div>
        <li>You are an Administrator. This means you can create and edit users, subjects and classes.</li>
        <li>
          You can edit users e.g. make yourself a teacher by clicking Users, View All Users, clicking the edit button next to the user,
          changing the user and clicking Submit. If you edited yourself please logout then back in again.
        </li>
      </div>
    );
  }
}

export default AdminInfo;
