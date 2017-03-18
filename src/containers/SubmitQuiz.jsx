import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, submitQuiz } from '../actions/homework/quiz';
import { browserHistory } from 'react-router';

class SubmitQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {questions: [], title: '', date_due: '', description: ''},
      answers: []
    }
  }

  componentDidMount() {
    this.props.fetchQuiz(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (!(nextProps.failed) && nextProps.hasResponse) {
      browserHistory.push("/student/homework")
    }
    
    let answers = []
    if (nextProps.quiz){
      answers = nextProps.quiz.questions.map(question => {
        return {question_id: question.id, answer: ''}
      })
    }
    this.setState({ quiz: nextProps.quiz, answers })
  }

  submitQuiz(e) {
    e.preventDefault()
    console.log(this.state)
    this.props.submitQuiz(this.state, this.props.params.id)
  }

  updateAnswer(answer, index) {
    const answers = this.state.answers.slice()
    answers[index].answer = answer;
    this.setState({ answers })
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

    const { title, description, date_due, questions } = this.state.quiz

    return (
      <div>
        <h2>Submit Quiz - {title}</h2>
        <h3>Due: <em>{date_due}</em></h3>
        <p>{description}</p>
        {errorDiv}
        <form>
          {
            questions.map((question, index) => {
              return (
                <div className="form-group" key={index}>
                  <label>Question {index + 1}: {question.question_text}</label>
                  <input
                    type="text"
                    name="answer"
                    placeholder="Answer"
                    className="form-control"
                    onChange={event => this.updateAnswer(event.target.value, index)}
                  />
                </div>
              );
            })
          }
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {this.submitQuiz(e)}}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { quiz } = state.fetchQuiz;
  const { errorMessage, hasResponse, failed } = state.submitQuiz
  return {
    errorMessage,
    hasResponse,
    failed,
    quiz
  };
}


const mapDispatchToProps = {
  fetchQuiz,
  submitQuiz
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitQuiz);
