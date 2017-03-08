import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminInfo from '../components/AdminInfo';
import TeacherInfo from '../components/TeacherInfo';
import StudentInfo from '../components/StudentInfo';

class Main extends Component {
  render() {
    return (
      <div>
        <p>Welcome! If this is your first visit then here are a few things to know.</p>
        <ol>
          <li>
            Your user account is part of a school. All users in a school at least one of the following:
            <ul>
              <li>Administrator - can manage users, subjects and classes</li>
              <li>Teacher - are assigned classes by Administrators and can set and mark homework for their classes</li>
              <li>Student - are assigned classes by Administrators and can complete homework set by Teachers</li>
            </ul>
          </li>
          {
            this.props.currentUser.isAdmin ? <AdminInfo /> : ""
          }
          {
            this.props.currentUser.isTeacher ? <TeacherInfo /> : ""
          }
          {
            this.props.currentUser.isStudent ? <StudentInfo /> : ""
          }

        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const currentUser = state.fetchCurrentUserDetails.user;
  return {
    currentUser
  }
}


export default connect(mapStateToProps, {})(Main);
