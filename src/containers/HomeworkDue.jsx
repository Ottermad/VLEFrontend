import React, { Component } from 'react';
import { fetchHomeworkDue } from '../actions/homework';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';

class HomeworkDue extends Component {

  componentDidMount() {
    this.props.fetchHomeworkDue()
  }

  render() {
    const now = moment()
    return (
      <div>
        <h1>Homework Due</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Date Due</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.homework.map(homework => {
                const dateDueMoment = moment(homework.date_due, "DD/MM/YYYY")
                const isDue = dateDueMoment.isAfter(now) || dateDueMoment.isSame(now)
                let submitted = <td><Link to={`/student/submit/${homework.type}/${homework.id}`}>Submit</Link></td>

                if (homework.submitted) {
                    submitted = <td><Link to={`/student/submissions/${homework.type}/${homework.submission.id}`}>View Submission</Link></td>
                }
                return (
                  <tr key={homework.id}  className={isDue ? "danger" : ""}>
                    <td>{homework.title}</td>
                    <td>{homework.type}</td>
                    <td>{homework.description}</td>
                    <td>{homework.date_due}</td>
                    {submitted}
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
  const { homework } = state.fetchHomeworkDue;
  return {
    homework
  };
}

export default connect(mapStateToProps, { fetchHomeworkDue })(HomeworkDue);
