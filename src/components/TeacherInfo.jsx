import React, { Component } from 'react';

class TeacherInfo extends Component {
  render() {
    return (
      <div>
        <li>You are a teacher.</li>
        <li>
          Teachers can view their lessons by clicking on My Lessons. To view the individual class,
          click My Lessons and then clicking on a class. Here they can view whose in the class and see what homework
          has been set for that class.
        </li>
        <li>
          Teachers set homework for a class by clicking Assign Homework then choosing the type of homework you want to set.
        </li>
        <li>
          There are currently 1 type(s) of homework that can be set:
          <ul>
            <li>Essay - an extended piece of writing that Students can submit and you can leave comments on.</li>
          </ul>
        </li>
      </div>
    );
  }
}

export default TeacherInfo;
