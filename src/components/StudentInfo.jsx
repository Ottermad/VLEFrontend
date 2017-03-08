import React, { Component } from 'react';

class StudentInfo extends Component {
  render() {
    return (
      <div>
        <li>
          You are a student.
        </li>
        <li>To view what homework you have due click My Homework.</li>
        <li>
          To submit a piece of homework click on My Homework then click
          submit next to the piece of homework you want to submit.
        </li>
      </div>
    );
  }
}

export default StudentInfo;
