import React, { Component } from 'react';
import QuestionInput from './QuestionInput';

class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson_id: props.lesson_id,
      title: '',
      description: '',
      questions: [
        {
          question_text: '',
          answer: ''
        }
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lesson_id } = nextProps;
    this.setState({lesson_id});
  }

  addQuestion(e) {
    e.preventDefault();
    this.state.questions.push({
      text: '',
      answer: ''
    })
    this.setState(this.state);
  }

  removeQuestion(index) {
    const { questions } = this.state;
    questions.splice(index, 1)
    this.setState({ questions });
  }

  updateQuestionText(text, index) {
    const { questions } = this.state;
    questions[index].question_text = text;
    this.setState({ questions });
  }

  updateQuestionAnswer(answer, index) {
    const { questions } = this.state;
    questions[index].answer = answer;
    this.setState({ questions });
  }

  callCallback(e) {
    e.preventDefault();
    this.props.callback(this.state);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Class</label>
          <select className="form-control" onChange={(e) => this.setState({lesson_id: e.target.value})}>
            {
              this.props.lessons.map(lesson => {
                return (
                    <option key={lesson.id} value={lesson.id}>{lesson.name} - {lesson.subject.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            className="form-control"
            onChange={event => this.setState({title: event.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Description"
            onChange={event => this.setState({description: event.target.value})}
            ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date_due">Date Due</label>
          <input
            type="date"
            id="date_due"
            name="date_due"
            className="form-control"
            onChange={event => this.setState({date_due: event.target.value})}
          />
        </div>
        {
          this.state.questions.map((question, index) => {
            return (
              <div key={index}>
                <hr />
                <label>Question {index + 1}</label>
                <button
                  className="btn btn-link"
                  onClick={() => this.removeQuestion(index)}
                >
                  Delete
                </button>
                <QuestionInput
                  text={question.text}
                  answer={question.answer}
                  textCallback={this.updateQuestionText.bind(this)}
                  answerCallback={this.updateQuestionAnswer.bind(this)}
                  index={index} />
              </div>
            );
          })
        }
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {this.addQuestion(e)}}
        >
          Add Question
        </button>
        <button
          type="submit"
          className="btn btn-success"
          onClick={(e) => {this.callCallback(e)}}
        >
          Assign
        </button>
      </form>
    );
  }
}

export default QuizForm;
