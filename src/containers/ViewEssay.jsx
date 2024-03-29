import React, { Component } from 'react';
import { fetchEssaySubmission } from '../actions/homework/essay';
import { createComment } from '../actions/homework/comments';
import { connect } from 'react-redux';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

class ViewEssay extends Component {
  constructor(props) {
      super(props);
      this.state = {
        comments: []
      }
  }

  componentDidMount() {
    this.props.fetchEssaySubmission(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    const comments = nextProps.submission.comments;
    this.setState({comments})
  }

  createComment(state) {
    state['submission_id'] = this.props.submission.id;
    state['user'] = this.props.currentUser;
    this.state.comments.push(state)
    this.setState(this.state)
    this.props.createComment(state)
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
          {
            this.props.currentUser.isTeacher ? <CommentForm callback={(state) => this.createComment(state)}/> : ""
          }
          <p>Submitted By: <em>{first_name} {last_name}</em></p>
          <p>Submitted At: <em>{datetime_submitted}</em></p>
          <p>Date Due: <em>{date_due}</em></p>
          <hr />
          <CommentList comments={this.state.comments} />
          <hr />
          <p>{text}</p>
        </div>
      )
    }

    return (
      <div>
        {errorDiv}
        {successDiv}
        {response}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { submission, errorMessageEssay, error, hasResponse } = state.fetchEssaySubmission;
  const { successMessageComment, errorMessageComment } = state.createComment;
  const currentUser = state.fetchCurrentUserDetails.user;
  return {
    submission,
    error,
    hasResponse,
    currentUser,
    success: [successMessageComment],
    errors: [errorMessageComment, errorMessageEssay],
  }
}

export default connect(mapStateToProps, { fetchEssaySubmission, createComment })(ViewEssay);
