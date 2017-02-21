import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLesson, fetchUsers, fetchSubjects } from '../actions';

class LessonCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subject_id: '',
      teacher_ids: [],
      student_ids: []
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchSubjects();
  }

  createSubject(e) {
    e.preventDefault();
    // console.log(this.state)
    this.props.createLesson(this.state)
  }

  handleTeacherSelectChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({teacher_ids: value});
  }

  handleStudentSelectChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({student_ids: value});
  }

  componentWillReceiveProps(nextProps) {
    const defaultSubjectId = nextProps.subjects[0] ? nextProps.subjects[0].id : ""
    console.log("DEFAULT", defaultSubjectId)
    this.setState({subject_id: defaultSubjectId})
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
        <h2>Create Lesson</h2>
        {successDiv}
        {errorDiv}
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              onChange={event => this.setState({name: event.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <select className="form-control" onChange={(e) => this.setState({subject_id: e.target.value})}>
              {
                this.props.subjects.map(subject => {
                  const {name, id} = subject;
                  return (
                    <option value={id} key={id}>{name}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label style={{display: 'block'}}>Teacher(s)</label>
            <select multiple onChange={(e) => this.handleTeacherSelectChange(e)}>
              {
                this.props.users.map(user => {
                  const { first_name, last_name, id, permissions } = user;
                  const isTeacher = permissions.some(permission => {
                    return permission.name === "Teacher"
                  });
                  if (isTeacher) {
                    return (
                      <option value={id} key={id}>{first_name} {last_name}</option>
                    )
                  } else {
                    return ""
                  }
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label style={{display: 'block'}}>Student(s)</label>
            <select multiple onChange={(e) => this.handleStudentSelectChange(e)}>
              {
                this.props.users.map(user => {
                  const { first_name, last_name, id, permissions } = user;
                  const isStudent = permissions.some(permission => {
                    return permission.name === "Student"
                  });
                  if (isStudent) {
                    return (
                      <option value={id} key={id}>{first_name} {last_name}</option>
                    )
                  } else {
                    return ""
                  }
                })
              }
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {this.createSubject(e)}}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.createLesson;
  const { users } = state.usersListing;
  const { subjects } = state.subjectListing;
  return {
    errorMessage,
    successMessage,
    users,
    subjects
  };
}


const mapDispatchToProps = {
  createLesson,
  fetchUsers,
  fetchSubjects
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCreation);
