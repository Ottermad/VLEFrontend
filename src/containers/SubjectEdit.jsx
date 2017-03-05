import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubjectForm from '../components/SubjectForm';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';
import { editSubject, subjectDetail } from '../actions/subjects';

class SubjectEdit extends Component {

  componentWillMount() {
    console.log('fetching')
    this.props.subjectDetail(this.props.params.id)
  }

  editSubject(subject) {
    this.props.editSubject(subject, this.props.params.id)
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
        <h2>Edit Subject</h2>
        {successDiv}
        {errorDiv}
        <SubjectForm callback={this.editSubject.bind(this)} name={this.props.subject.name}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { successMessage, errorMessage } = state.subjectEdit;
  const { subject } = state.subjectDetail;
  return {
    subject,
    errors: [errorMessage],
    success: [successMessage],
  };
}


const mapDispatchToProps = {
  editSubject,
  subjectDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEdit);
