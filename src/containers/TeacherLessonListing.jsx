import React, { Component } from 'react';
import { fetchLessonsTaught } from '../actions/lessons';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class TeacherLessonListing extends Component {

  componentDidMount() {
    this.props.fetchLessonsTaught()
  }

  render() {
    return (
      <div>
        <h1>Lessons</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lessons.map(lesson => {
                const { name, id, subject } = lesson;
                return (
                  <tr key={id}>
                    <td>
                      <Link to={"/teacher/lessons/" + id}>{name} - {subject.name}</Link>
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
  const { lessons } = state.lessonsTaughtListing;
  return {
    lessons
  };
}

export default connect(mapStateToProps, { fetchLessonsTaught })(TeacherLessonListing);
