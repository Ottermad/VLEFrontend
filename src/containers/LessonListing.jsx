import React, { Component } from 'react';
import { fetchLessons } from '../actions';
import { connect } from 'react-redux';

class LessonListing extends Component {

  componentDidMount() {
    this.props.fetchLessons()
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
                const { name, id } = lesson;
                return (
                  <tr key={id}>
                    <td>{name}</td>
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
  return {
    lessons
  };
}

export default connect(mapStateToProps, { fetchLessons })(LessonListing);
