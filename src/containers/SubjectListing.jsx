import React, { Component } from 'react';
import { fetchSubjects, deleteSubject } from '../actions/subjects';
import { connect } from 'react-redux';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';

class SubjectListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjects: props.subjects || []
    }
  }

  componentWillReceiveProps(props) {
    if (props.success.length > 0 && props.success[0]) {
      console.log("SETTING STATE")
      this.state.subjects.splice(this.state.subjectIndex, 1);
      this.setState(this.state);
    }
    this.setState({subjects: props.subjects || []})
  }

  componentDidMount() {
    this.props.fetchSubjects()
  }

  deleteSubject(subject_id, index) {
    this.props.deleteSubject(subject_id)
    this.setState({subjectIndex: index})
  }

  render() {
    let errorDiv = (
      <div>
        {
          this.props.errors.map((error, index) => {
            if (error && error.length > 0) {
              return <ErrorDiv message={error} key={index}/>
            }
            return "";
          })
        }
      </div>
    );

    let successDiv = (
      <div>
        {
          this.props.success.map((success, index) => {
            if (success && success.length > 0) {
              return <SuccessDiv message={success} key={index}/>
            }
            return "";
          })
        }
      </div>
    );

    return (
      <div>
        <h1>Subjects</h1>
        {successDiv}
        {errorDiv}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.subjects.map((subject, index) => {
                const { name, id } = subject;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>
                      <button
                        className="btn-small btn-danger btn"
                        onClick={() => this.deleteSubject(id, index) }
                      >
                        Delete
                      </button>
                    </td>
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
  const { successMessage, errorMessage } = state.subjectDelete;
  return {
    errors: [errorMessage],
    success: [successMessage],
    subjects
  };
}

export default connect(mapStateToProps, { fetchSubjects, deleteSubject })(SubjectListing);
