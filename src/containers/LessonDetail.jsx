import React, { Component } from 'react';
import { fetchLesson } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';

class LessonDetail extends Component {

  componentWillMount() {
    this.props.fetchLesson(this.props.params.id)
  }

  render() {
    let errorDiv;
    if (this.props.errorMessage && this.props.errorMessage.length > 0) {
      errorDiv = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      )
    }

    console.log(this.props.lesson)
    const { name, teachers, students, subject, homework } = this.props.lesson
    const now = moment()
    return (
      <div>
        {errorDiv}
        <h1>{name}</h1>
        <h2>Subject: <em>{subject.name}</em></h2>
        <h2>Teachers:</h2>
        <ul>
          {
            teachers.map(teacher => {
              return (<li key={teacher.id}>{teacher.first_name} {teacher.last_name}</li>)
            })
          }
        </ul>

        <h2>Students:</h2>
        <ul>
          {
            students.map(student => {
              return (<li key={student.id}>{student.first_name} {student.last_name}</li>)
            })
          }
        </ul>

        <h2>Homework</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Date Due</th>
            </tr>
          </thead>
          <tbody>
            {
              homework.map(homework => {
                const dateDueMoment = moment(homework.date_due, "DD/MM/YYYY")
                const isDue = dateDueMoment.isAfter(now) || dateDueMoment.isSame(now)
                console.log(isDue)
                return (
                  <tr key={homework.id}  className={isDue ? "danger" : ""}>
                    <td>{homework.title}</td>
                    <td>{homework.type}</td>
                    <td>{homework.description}</td>
                    <td>{homework.date_due}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { lesson, errorMessage } = state.lessonDetail;
  return { lesson, errorMessage }
}

export default connect(mapStateToProps, { fetchLesson })(LessonDetail);
