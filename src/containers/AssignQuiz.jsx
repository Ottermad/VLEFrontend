import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessonsTaught } from '../actions/lessons';
import { assignQuiz } from '../actions/homework/quiz';
import moment from 'moment';
import QuizForm from '../components/QuizForm';

class AssignQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lesson_id: '',
      title: '',
      description: '',
      date_due: null
    }
  }

  componentDidMount() {
    this.props.fetchLessonsTaught()
  }

  componentWillReceiveProps(nextProps) {
    const defaultLessonId = nextProps.lessons[0] ? nextProps.lessons[0].id : ""
    console.log("SETTING DEFAULT", defaultLessonId)
    this.setState({lesson_id: defaultLessonId})
  }

  assignQuiz(quiz) {
    console.log(quiz)
    const { date_due } = quiz;
    const date = moment(new Date(date_due)).format('DD/MM/YYYY');
    quiz.date_due = date
    this.props.assignQuiz(quiz);
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
        <h1>Assign Quiz</h1>
        {successDiv}
        {errorDiv}
        <QuizForm lessons={this.props.lessons} lesson_id={this.state.lesson_id} callback={this.assignQuiz.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.assignQuiz;
  const { lessons } = state.lessonsTaughtListing;
  return {
    lessons,
    errorMessage,
    successMessage
  };
}


const mapDispatchToProps = {
  fetchLessonsTaught,
  assignQuiz
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignQuiz);
