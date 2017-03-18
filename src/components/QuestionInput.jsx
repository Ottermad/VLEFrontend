import React, { Component } from 'react';

class QuestionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      answer: '',
    }
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            name="question"
            placeholder="Question Text"
            className="form-control"
            onChange={event => this.props.textCallback(event.target.value, this.props.index)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Answer</label>
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            className="form-control"
            onChange={event => this.props.answerCallback(event.target.value, this.props.index)}
          />
        </div>
      </div>
    )
  }
}

export default QuestionInput;
