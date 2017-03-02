import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessonsTaught } from '../actions/lessons';
import { assignEssay } from '../actions/homework/essay';
import moment from 'moment';

class AssignEssay extends Component {
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
    this.setState({lesson_id: defaultLessonId})
  }

  assignEssay(e) {
    e.preventDefault()
    const { lesson_id, title, description, date_due } = this.state;
    const date = moment(new Date(date_due)).format('DD/MM/YYYY');
    this.props.assignEssay({ lesson_id, title, description, date_due: date})
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
        <h1>Assign Essay</h1>
        {successDiv}
        {errorDiv}
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
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {this.assignEssay(e)}}
          >
            Assign
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.assignEssay;
  const { lessons } = state.lessonsTaughtListing;
  return {
    lessons,
    errorMessage,
    successMessage
  };
}


const mapDispatchToProps = {
  fetchLessonsTaught,
  assignEssay
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignEssay);
