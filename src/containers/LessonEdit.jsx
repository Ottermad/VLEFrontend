import React, { Component } from 'react';
import { connect } from 'react-redux';
import LessonForm from '../components/LessonForm';
import { fetchLesson, editLesson } from '../actions/lessons';
import { fetchUsers } from '../actions/user';
import { fetchSubjects } from '../actions/subjects';

class LessonEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_ids: [],
      teacher_ids: []
    }
  }

  componentWillMount() {
    this.props.fetchLesson(this.props.params.id)
    this.props.fetchUsers()
    this.props.fetchSubjects();
  }

  editLesson(state) {
    this.props.editLesson(state, this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    let student_ids = this.props.lesson.students.map(student => {
      return student.id
    })
    let teacher_ids = this.props.lesson.teachers.map(teacher => {
      return teacher.id
    })
    this.setState({student_ids, teacher_ids})
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
        <h2>Edit Lesson</h2>
        {successDiv}
        {errorDiv}
        <LessonForm
          subjects={this.props.subjects}
          users={this.props.users}
          subject_id={this.props.lesson.subject_id}
          name={this.props.lesson.name}
          student_ids={this.state.student_ids}
          teacher_ids={this.state.teacher_ids}
          callback={this.editLesson.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.lessonEdit;
  const { users } = state.usersListing;
  const { subjects } = state.subjectListing;
  const { lesson } = state.lessonDetail;
  return {
    errorMessage,
    successMessage,
    users,
    subjects,
    lesson
  };
}


const mapDispatchToProps = {
  fetchLesson,
  fetchUsers,
  fetchSubjects,
  editLesson
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonEdit);
