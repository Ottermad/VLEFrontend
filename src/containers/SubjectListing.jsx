import React, { Component } from 'react';
import { fetchSubjects } from '../actions/subjects';
import { connect } from 'react-redux';

class SubjectListing extends Component {

  componentDidMount() {
    this.props.fetchSubjects()
  }

  render() {
    return (
      <div>
        <h1>Subjects</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.subjects.map(subject => {
                const { name, id } = subject;
                return (
                  <tr key={id}>
                    <td>{name}</td>
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
  const { subjects } = state.subjectListing;
  return {
    subjects
  };
}

export default connect(mapStateToProps, { fetchSubjects })(SubjectListing);
