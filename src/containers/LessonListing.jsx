import React, { Component } from 'react';
import { fetchLessons, deleteLesson } from '../actions/lessons';
import { connect } from 'react-redux';
import SuccessDiv from '../components/SuccessDiv';
import ErrorDiv from '../components/ErrorDiv';

class LessonListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lessons: props.lessons || []
    }
  }

  componentWillReceiveProps(props) {
    if (props.success.length > 0 && props.success[0]) {
      this.state.lessons.splice(this.state.lessonIndex, 1);
      this.setState(this.state);
    }
    this.setState({lessons: props.lessons || []})
  }

  componentDidMount() {
    this.props.fetchLessons()
  }

  deleteLesson(lesson_id, index) {
    this.props.deleteLesson(lesson_id)
    this.setState({lessonIndex: index})
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
        <h1>Lessons</h1>
        {errorDiv}
        {successDiv}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lessons.map((lesson, index) => {
                const { name, id } = lesson;
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>
                      <button
                        className="btn-small btn-danger btn"
                        onClick={() => this.deleteLesson(id, index) }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { lessons } = state.lessonListing;
  const { successMessage, errorMessage } = state.lessonDelete;
  return {
    errors: [errorMessage],
    success: [successMessage],
    lessons
  };
}

export default connect(mapStateToProps, { fetchLessons, deleteLesson })(LessonListing);
