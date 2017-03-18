import React, { Component } from 'react';
import { fetchQuizSubmission } from '../actions/homework/quiz';
import { createComment } from '../actions/homework/comments';
import { connect } from 'react-redux';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

class ViewQuiz extends Component {
  constructor(props) {
      super(props);
      this.state = {
        comments: []
      }
  }

  componentDidMount() {
    this.props.fetchQuizSubmission(this.props.params.id)
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
    console.log(this.props.submission)
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
      const { homework, user, score, datetime_submitted, answers } = this.props.submission;
      const { title, description, date_due, number_of_questions, questions } = homework;
      const { first_name, last_name } = user;

      response = (
        <div>
          <h1>Quiz - {title}</h1>
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
          <p><strong>Score</strong>: {score} out of {number_of_questions}</p>
          {
            questions.map((question, index) => {
              return (
                <div key={index}>
                  <p>{question.question_text} - { answers[index].correct ? "Correct" : "Wrong"}</p>
                  <p>Student's answer: {answers[index].answer}</p>
                  <p>Correct answer: {question.answer}</p>
                </div>
              );
            })
          }
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
  const { submission, errorMessageQuiz, error, hasResponse } = state.fetchQuizSubmission;
  const { successMessageComment, errorMessageComment } = state.createComment;
  const currentUser = state.fetchCurrentUserDetails.user;
  return {
    submission,
    error,
    hasResponse,
    currentUser,
    success: [successMessageComment],
    errors: [errorMessageComment, errorMessageQuiz],
  }
}

export default connect(mapStateToProps, { fetchQuizSubmission, createComment })(ViewQuiz);
