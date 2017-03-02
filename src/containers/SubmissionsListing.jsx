import React, { Component } from 'react';
import { fetchSubmissions } from '../actions/homework';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SubmissionsListing extends Component {

  componentDidMount() {
    this.props.fetchSubmissions(this.props.params.id)
  }

  render() {
    return (
      <div>
        <h1>Submissions</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Datetime Submitted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.submissions.map(submission => {
                const { user, id, datetime_submitted, type } = submission;
                const { first_name, last_name } = user;
                return (
                  <tr key={id}>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{datetime_submitted}</td>
                    <td><Link to={`/teacher/submissions/${type}/${id}`}>View</Link></td>
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
  const { submissions } = state.fetchSubmissions;
  return {
    submissions
  };
}

export default connect(mapStateToProps, { fetchSubmissions })(SubmissionsListing);
