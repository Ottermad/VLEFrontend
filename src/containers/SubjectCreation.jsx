import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubjectForm from '../components/SubjectForm';
import { createSubject } from '../actions/subjects';

class SubjectCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  createSubject(subject) {
    this.props.createSubject(subject.name)
  }

  render() {
    let successDiv;
    if (this.props.successMessage && this.props.successMessage.length > 0) {
      successDiv = (
        <div className="alert alert-success" role="alert">
          {this.props.successMessage}
        </div>
      )
    }

    let errorDiv;
    if (this.props.errorMessage && this.props.errorMessage.length > 0) {
      errorDiv = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      )
    }

    return (
      <div>
        <h2>Create Subject</h2>
        {successDiv}
        {errorDiv}
        <SubjectForm callback={this.createSubject.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.createSubject;
  return {
    errorMessage,
    successMessage
  };
}


const mapDispatchToProps = {
  createSubject
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCreation);
