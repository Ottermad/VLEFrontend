import React, { Component } from 'react';
import { fetchEssaySubmission } from '../actions/homework/essay';
import { connect } from 'react-redux';

class ViewEssay extends Component {

  componentDidMount() {
    this.props.fetchEssaySubmission(this.props.params.id)
  }

  render() {
    console.log(this.props.submission)
    let errorDiv;
    if (this.props.errorMessage && this.props.errorMessage.length > 0) {
      errorDiv = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      )
    }

    let response = ""
    if (this.props.hasResponse && !(this.props.error)) {
      const { homework, user, text, datetime_submitted } = this.props.submission;
      const { title, description, date_due } = homework;
      const { first_name, last_name } = user;

      response = (
        <div>
          <h1>Essay - {title}</h1>
          <em>{description}</em>
          <hr />
          <p>Submitted By: <em>{first_name} {last_name}</em></p>
          <p>Submitted At: <em>{datetime_submitted}</em></p>
          <p>Date Due: <em>{date_due}</em></p>
          <hr />
          <p>{text}</p>
        </div>
      )
    }

    return (
      <div>
        {errorDiv}
        {response}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { submission, errorMessage, error, hasResponse } = state.fetchEssaySubmission;
  return { submission, errorMessage, error, hasResponse }
}

export default connect(mapStateToProps, { fetchEssaySubmission })(ViewEssay);
